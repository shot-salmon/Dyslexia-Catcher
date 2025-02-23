from tortoise import utils, api
import glob
import torchaudio

clips_paths = glob.glob('./voice/*.wav')
reference_clips = [utils.audio.load_audio(p, 22050) for p in clips_paths]
tts = api.TextToSpeech()
pcm_audio = tts.tts_with_preset("our text will be here", voice_samples=reference_clips, preset='fast')
torchaudio.save('out.wav', pcm_audio.squeeze(0).cpu(), 24000)