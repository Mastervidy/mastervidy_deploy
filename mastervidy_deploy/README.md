# MasterVidy Website — Deployment Guide

This is a self-contained website: **one file (`index.html`)** holds the entire site —
every page, all styling, and all functionality. There is nothing to "build" or
"compile." You just need to put these files on a web host and point your domain
at them.

## Files in this package

| File | What it's for |
|---|---|
| `index.html` | The entire website. This is the only file that matters functionally. |
| `robots.txt` | Tells search engines they're allowed to crawl the site. |
| `sitemap.xml` | Helps search engines find your homepage. |
| `README.md` | This guide. |

---

## Step 1 — Buy your domain

Any registrar works (Namecheap, GoDaddy, Google Domains, a local Zimbabwean
registrar, etc.). Once bought, you'll manage its **DNS settings** — that's where
you'll point it at your host in Step 3.

## Step 2 — Pick a host

Since this is a plain static site (no server-side code, no database), you have
cheap/free options. Pick whichever is easiest for you:

### Option A — Netlify or Vercel (free, easiest, recommended)
1. Create a free account at netlify.com or vercel.com.
2. Drag the folder containing these files onto their "Deploy" page (Netlify has a
   literal drag-and-drop box for this).
3. It gives you a live link immediately (e.g. `yoursite.netlify.app`).
4. In their dashboard, go to **Domain settings → Add custom domain**, enter your
   bought domain, and follow the DNS instructions they give you (usually adding a
   couple of records at your registrar).

### Option B — Traditional web hosting (cPanel, shared hosting, etc.)
1. Buy hosting (many registrars bundle this with the domain).
2. Log into cPanel → **File Manager** (or use FTP with a tool like FileZilla).
3. Go to the `public_html` folder (or `www`, depending on your host).
4. Upload `index.html`, `robots.txt`, and `sitemap.xml` directly into that folder.
5. Your domain should now show the site immediately — no DNS changes needed if
   the domain and hosting were bought together.

### Option C — GitHub Pages (free)
1. Create a free GitHub account and a new repository.
2. Upload these files to the repository.
3. In the repo's **Settings → Pages**, enable GitHub Pages on the main branch.
4. In **Settings → Pages → Custom domain**, enter your domain and follow GitHub's
   DNS instructions.

## Step 3 — Point your domain at your host

Your registrar and your host both give you DNS instructions — usually either:
- An **A record** pointing at an IP address they give you, or
- **Nameservers** you switch to point at the host instead of the registrar.

Follow whichever instructions your specific host shows you after Step 2 — they
vary slightly between providers but the process is always guided.

DNS changes can take a few minutes to 24 hours to fully activate everywhere.

## Step 4 — Update the sitemap/robots domain

Before uploading, open `robots.txt` and `sitemap.xml` in a text editor and
replace `https://www.mastervidy.com/` with your actual domain, if it's
different.

---

## Important things to know about this specific site

### The Admin panel and localStorage
The Admin page (footer link) lets you add/remove pictures, news, links, and set
ghetto reps directly from the browser — **but those changes only save to the
browser and domain you're using at the time.** This is a real limitation of the
current build (no live shared database), not something that changes based on
where you host it.

Practically:
- Whatever content is baked into `index.html` right now (all your real photos,
  ghetto rep data, videos, etc.) will show for **everyone**, on any device,
  the moment you deploy it.
- Any *new* edits made through Admin after deployment will only show on that
  one browser, on that one device, until you either:
  - Ask Claude to bake the update into `index.html` and re-upload the file, or
  - We move to a real backend (a database) later, which is a bigger step and
    would very likely require visitors to sign in — trading convenience for a
    login wall.

### WhatsApp and phone
The "Register" and "Reveal" forms open WhatsApp with a prefilled message to
**+263 71 620 5641**. The Contact page also lists **+263 78 728 1533** for
calls. Both work from any domain — no setup needed.

### HTTPS
Netlify, Vercel, and GitHub Pages all give you free HTTPS automatically once
your domain is connected. Most traditional hosts also offer free HTTPS
(often via "Let's Encrypt" — look for it in your host's control panel and
enable it after your domain is pointed correctly).

---

## Updating the site later

Whenever you want new content baked in permanently (new challenges, videos,
ghetto results, redesigns, etc.), the fastest path is:
1. Ask Claude to make the change to `index.html`.
2. Download the updated file.
3. Re-upload it to your host, replacing the old one (same filename, same
   location — it just overwrites).

That's it — there's no rebuild step, no server restart, nothing else to touch.
