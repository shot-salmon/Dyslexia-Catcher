import whisper
from pydub import AudioSegment

def trans(path):
    model = whisper.load_model("medium")
    raw_list = list()
    
    res = model.transcribe(path, no_speech_threshold=0.4, language='english')
    [raw_list.append(j["text"]) for j in res["segments"]]

    del model
    return raw_list    

def main(path):
    transcribedText= trans(path)

    return transcribedText