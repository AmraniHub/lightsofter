#!/usr/bin/env python3
import os, json, urllib.request, glob, datetime

token   = os.environ.get("TELEGRAM_BOT_TOKEN", "")
chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

if not token or not chat_id:
    print("No Telegram credentials, skipping.")
    raise SystemExit(0)

posts  = sorted(glob.glob("content/blog/*.md"), reverse=True)
count  = len(posts)
recent = "\n".join(f"• {os.path.basename(p)[:-3]}" for p in posts[:5]) or "No posts yet"
now    = datetime.datetime.utcnow()
week   = now.strftime("%V")
year   = now.strftime("%Y")

text = (
    f"📊 Rapport SEO Hebdomadaire — Semaine {week}/{year}\n\n"
    f"🌐 https://lightsofter.vercel.app\n"
    f"📝 Total articles : {count}\n\n"
    f"📅 5 derniers articles :\n{recent}\n\n"
    f"✅ Génération automatique active (8h UTC)\n"
    f"✅ Déploiement Vercel actif"
)

payload = json.dumps({"chat_id": chat_id, "text": text}).encode()
req = urllib.request.Request(
    f"https://api.telegram.org/bot{token}/sendMessage",
    data=payload,
    headers={"Content-Type": "application/json"},
)
with urllib.request.urlopen(req) as r:
    print(r.read().decode())
