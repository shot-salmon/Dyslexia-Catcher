# bootstrap.py
import os
import subprocess
import sys
from pathlib import Path

def create_and_setup_venv():
    """
    venv 폴더가 없으면 생성하고, requirements.txt에 있는 패키지를 설치합니다.
    """
    base_dir = Path(__file__).resolve().parent
    venv_dir = base_dir / "venv"
    
    # venv/Scripts 폴더가 없으면 가상 환경을 생성합니다.
    if not (venv_dir / "Scripts").exists():
        print("Creating venv...")
        subprocess.check_call([sys.executable, "-m", "venv", "venv"])
        sys.executable = venv_dir / "Scripts" / "python.exe"
    
    print("Checked the venv folder. Now installing requirements...")
    
    # venv의 Python 경로
    python_executable = venv_dir / "Scripts" / "python.exe"
    # venv의 pip 경로
    pip_executable = venv_dir / "Scripts" / "pip.exe"
    
    # pip 업데이트
    subprocess.check_call([str(python_executable), "-m", "pip", "install", "-U", "pip"])
    
    # requirements.txt에 있는 라이브러리 설치
    try:
        subprocess.check_call([str(pip_executable), "install", "-r", "requirements.txt"])
    except subprocess.CalledProcessError:
        print("\nRequirements installation failed. Please remove the venv folder and try again.")
        sys.exit(1)
    
    print("\nRequirements installed successfully.")

def relaunch_in_venv():
    """
    현재 프로세스가 venv 내의 파이썬 인터프리터로 실행되고 있는지 확인하고,
    그렇지 않으면 venv의 파이썬으로 main.py를 재실행합니다.
    """
    base_dir = Path(__file__).resolve().parent
    venv_python = base_dir / "venv" / "Scripts" / "python.exe"
    
    # 현재 실행 중인 파이썬 인터프리터가 venv의 python.exe가 아니라면 재실행
    if os.path.abspath(sys.executable) != os.path.abspath(str(venv_python)):
        print("Relaunching main.py with venv Python interpreter...")
        print(str(venv_python))
        subprocess.check_call([str(venv_python), "main.py"])
        sys.exit(0)

def bootstrap():
    """
    가상 환경 생성 및 패키지 설치 후, venv 환경으로 재실행하는 부트스트랩 함수
    """
    base_dir = Path(__file__).resolve().parent
    venv_dir = base_dir / "venv"

    if not venv_dir.exists():
        create_and_setup_venv()
    relaunch_in_venv()
