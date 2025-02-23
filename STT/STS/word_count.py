import os
import re
import pandas as pd
import torch
import torch.nn.functional as F

def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0]
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

def is_similar(text1, text2, tokenizer, model):
    """
    Compare two text1 and text2 with threshold
    If those are similar function returns True
    If not, function returns False
    """
    sentences = text1, text2
    encoded_input = tokenizer(sentences, padding=True, truncation=True, return_tensors='pt')

    with torch.no_grad():
        model_output = model(**encoded_input)
    
    sentence_embeddings = mean_pooling(model_output, encoded_input['attention_mask'])
    similarity = F.cosine_similarity(sentence_embeddings[0].unsqueeze(0), sentence_embeddings[1].unsqueeze(0), dim=1)
    return similarity*100


def compare_word(input, jsonPath, jsonIndex, tokenizer, model):
    """
    input = [text1, text2, ...]
    jsonDf = [text1, text2, ...]
    jsonDf might be capitalized and not splitted therefore, use slice_sentences
    """
    
    voiceInputs = slice_sentences(input)
    jsonDf = pd.read_json(jsonPath)
    texts = [i.lower() for i in re.split(r'[.,?;!\-\s]+', jsonDf["story"][jsonIndex]['text']) if i]

    sentence1 = ""
    sentence2 = ""

    for i in voiceInputs:
        sentence1 += i+' '
    for j in texts:
        sentence2 += j+' '
    
    percent = is_similar(sentence1[:-1], sentence2[:-1], tokenizer, model)

    return percent
        
    

def slice_sentences(input):
    """
    input will be the list [text1, text2, text3, ...]
    each text_n might have multiple sentences
    so, slice them into one sentences
    """
    result = list()

    for sentence in input:
        s = re.split(r'[.,?!\-\s]+', sentence)
        result.extend(s)

    return [i.lower() for i in result if i]

if __name__ == "__main__":
    
    
    compare_word()