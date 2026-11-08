"""Build three standalone HTML pages from the shared theme."""
from base64 import b64encode
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path):
    return (ROOT / path).read_text(encoding="utf-8")


def main():
    page = read("src/page.html")
    css = read("src/theme.css")
    for font in sorted((ROOT / "assets").glob("*.woff")):
        data = b64encode(font.read_bytes()).decode("ascii")
        css = css.replace(f"@{font.name}@", f"data:font/woff;base64,{data}")
    page = page.replace("@CSS@", css)
    page = page.replace("@FONT_NOTICE@", read("assets/Shabnam-LICENSE.txt"))
    # The adapter initializes subscription before the shared code renders it.
    for adapter, output in (
        ("pasarguard", "themes/pasarguard/index.html"),
        ("3x-ui", "themes/3x-ui/sub.html"),
    ):
        html = page.replace("@ADAPTER@", read(f"adapters/{adapter}.js"))
        html = html.replace("@JS@", read("src/theme.js"))
        destination = ROOT / output
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(html, encoding="utf-8")


if __name__ == "__main__":
    main()
