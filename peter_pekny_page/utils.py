#import yt_dlp


#def download_youtube(url, output_path="downloads/"):
#    print(f"Downloading: {url}")
#    ydl_opts = {
#        'outtmpl': f'{output_path}%(title)s.%(ext)s',
#        'format': 'bestvideo+bestaudio/best',
#        'merge_output_format': 'mp4',
#    }
#    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
#        info = ydl.extract_info(url, download=True)
#        filename = ydl.prepare_filename(info)
#        print(f"Downloaded to: {filename}")
#        return filename
    
# Proggress bar status for youtube downloader
# 
# utils.py
from yt_dlp import YoutubeDL
import re

# Globálny objekt pre progres (len pre jednoduchý test)
progress_data = {
    "percent": "0%",
    "speed": "",
    "eta": "",
    "done": False,
    "filename": ""
}

def strip_ansi(string):
    if not string:
        return ""
    # Odstránime ANSI escape kódy z yt-dlp progresu
    ansi_escape = re.compile(r'[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]')
    return ansi_escape.sub("", string)

def sanitize_filename(name):
    """Odstráni problematické znaky zo súboru pre browser"""
    # Nahraď všetko okrem alfanumerických znakov, medzier, bodiek a pomlčiek pomlčkou
    return re.sub(r'[<>:"/\\|?*\u29f8]', "-", name)

def my_hook(d):
    if d['status'] == 'downloading':
        progress_data['percent'] = strip_ansi(d.get('_percent_str', '').strip())
        progress_data['speed'] = strip_ansi(d.get('_speed_str', ''))
        progress_data['eta'] = strip_ansi(d.get('_eta_str', ''))
        progress_data['filename'] = d.get('filename', '')
    elif d['status'] == 'finished':
        # toto je ešte iba stiahnutý stream
        progress_data['percent'] = '100%'
        progress_data['done'] = True
        progress_data['filepath'] = d.get('filepath') or d.get('filename')
    elif d.get('info_dict') and d.get('postprocessor') == 'FFmpegMerger':
        # toto je PO merge finálny mp4
        progress_data['percent'] = '100%'
        progress_data['done'] = True
        progress_data['filename'] = d['info_dict']['_filename']  # finálny .mp4


def download_youtube(url, output_path="media/"):
    print(f"Downloading: {url}")
    progress_data.clear()
    
    ydl_opts = {
        'outtmpl': f'{output_path}%(title)s.%(ext)s',
        'format': 'bestvideo+bestaudio/best',
        'merge_output_format': 'mp4',
        'progress_hooks': [my_hook],
    }
    
    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)
        progress_data['done'] = True
        progress_data['filepath'] = filename
        return filename