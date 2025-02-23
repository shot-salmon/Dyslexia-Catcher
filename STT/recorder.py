import pyaudio
import wave

def record_audio(output_filename="./output.wav", record_seconds=60, sample_rate=44100, chunk=1024, channels=2):
    """
    Records audio from the default input device and saves it to a WAV file.
    
    :param output_filename: Path to the output WAV file
    :param record_seconds: Duration to record, in seconds
    :param sample_rate: Samples per second
    :param chunk: Buffer size (number of frames per buffer)
    :param channels: Number of audio channels
    """
    audio = pyaudio.PyAudio()

    try:
        stream = audio.open(
            format=pyaudio.paInt16,   # 16-bit resolution
            channels=channels,        # Number of channels
            rate=sample_rate,         # Sampling rate
            input=True,               # Recording from an input device
            frames_per_buffer=chunk   # Buffer size
        )
    except:
        channels = 1
        stream = audio.open(
            format=pyaudio.paInt16,   # 16-bit resolution
            channels=channels,               # Number of channels
            rate=sample_rate,         # Sampling rate
            input=True,               # Recording from an input device
            frames_per_buffer=chunk   # Buffer size
        )

    print("Recording started...")

    frames = []

    for i in range(0, int(sample_rate / chunk * record_seconds)):
        data = stream.read(chunk)
        frames.append(data)

    print("Recording finished!")

    stream.stop_stream()
    stream.close()

    audio.terminate()

    with wave.open(output_filename, 'wb') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
        wf.setframerate(sample_rate)
        wf.writeframes(b''.join(frames))

def record(path):
    record_audio(output_filename=path)