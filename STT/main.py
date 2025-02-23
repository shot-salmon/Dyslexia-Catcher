import stt
import recorder

path = r'./harvard.wav'
recorder.record(path)
result = stt.trans(path)

print(result)