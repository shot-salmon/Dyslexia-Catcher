import sys
from STS.main import evaluation
from pathlib import Path
from bootstrap import bootstrap


def main():
    import stt
    import recorder

    print("Main function is running with the proper venv environment!")
    path = r'./out.wav'
    key = 0
    nums = 0
    score = 0

    if sys.argv[1] == 'prac':
        recorder.record_pd(path, sys.argv[2])

    if sys.argv[1] == 'test':
        recorder.record_pd(path, sys.argv[2])
        key = int(sys.argv[3])
        nums = int(sys.argv[4])
        trial = int(sys.argv[5])
    
    # else:
    #     recorder.record_p(path)
    
    result = stt.trans(path)
    score += evaluation(result, key)

    if nums != 0 and nums - 1 == trial:    
        print(score/nums)
    else:
        print(result)
    

if __name__ == '__main__':
    # 현재 실행 중인 파이썬 인터프리터 경로에 'venv'가 포함되어 있지 않으면 부트스트랩 실행
    base_dir = Path(__file__).resolve().parent
    venv_dir = base_dir / "venv"

    if not venv_dir.exists():
        bootstrap()
    else:
        main()


