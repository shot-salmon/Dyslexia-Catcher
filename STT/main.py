import sys
from bootstrap import bootstrap


def main():
    import stt
    import recorder

    print("Main function is running with the proper venv environment!")
    path = r'./out.wav'
    recorder.record(path)
    result = stt.trans(path)

    print(result)

if __name__ == '__main__':
    # 현재 실행 중인 파이썬 인터프리터 경로에 'venv'가 포함되어 있지 않으면 부트스트랩 실행
    if "venv" not in sys.executable.lower():
        bootstrap()
    else:
        main()


