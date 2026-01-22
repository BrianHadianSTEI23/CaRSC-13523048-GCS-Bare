# GSC Prototype for Ca-RSC26 
This is a prototype for THT RSC Part B Subdivision of Ground Control Station of number 4.

# Prerequisites
1. Python (pip, env, python)
2. Node js (minimum version >= 20.0)
3. git

# How to run
0. `git clone https://github.com/BrianHadianSTEI23/CaRSC-13523048-GCS-Bare`
## Backend
1. `cd gcs-backend`
2. `python -m venv .venv`
3. `./.venv/Scripts/activate` (for windows) and `./.venv/bin/activate` (for linux)
4. `pip install -r requirements.txt`
3. `uvicorn app.main:app --reload`
## Frontend
1. `cd gcs-frontend`
2. `npm install`
3. `npm run dev`

# Author 
> Brian A. Hadian (13523048)

# Notes
> Implementasi ini masih belum menerapkan docker karena kebetulan saat coba dockerize, makan waktu 2 jam dan belum selesai...