import word_count
from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained('jhgan/ko-sroberta-multitask')
model = AutoModel.from_pretrained('jhgan/ko-sroberta-multitask')

test = [' Once upon a time, there were three bears who lived together in a house of their own and owed.', \
        ' One of them was a little small wee bear, and one was a middle-sized bear, and the other was a great huge bear.', \
        ' They had each a pot for their porridge, a little pot for the little, small wee bear,',\
        ' and a middle-sized pot for the middle bear, and a great pot for the great huge bear.', \
        ' And they had each a chair to sit in, a little chair for the little, small wee bear,', \
        ' and a middle-sized chair for the middle bear, and a great chair for the great huge bear.', \
        ' And they had...']

result = word_count.slice_sentences(test)
json_path = './FairlyTale.json'
json_index = 0
result = word_count.compare_word(result, json_path, json_index, tokenizer, model)

print(round(result.item(), 2))