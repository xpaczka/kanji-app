from requests import get
from bs4 import BeautifulSoup


def get_entries_list(items: list[str]) -> list[str]:
    if not items:
        return []

    return [x.strip() for x in items[0].get_text().replace("\n", "").split(",")]


def find_records(item: BeautifulSoup, selector: str) -> list[str]:
    elements = item.select(f".{selector}")
    return get_entries_list(elements)


def transform_reading(readings: list[str]) -> list[str]:
    if not readings:
        return []

    readings_list = readings[0].split(":")[1].strip()

    return readings_list.split("、 ")


def scrape_data():
    jlpt_levels = ["jlpt-n1", "jlpt-n2", "jlpt-n3", "jlpt-n4", "jlpt-n5"]
    kanji_list = []

    for level in jlpt_levels:
        print(f"Fetching kanji for {level}...")
        page_number = 1

        while True:
            page_url = (
                f"https://jisho.org/search/%23{level}%20%23kanji?page={page_number}"
            )

            page = get(page_url)
            soup = BeautifulSoup(page.content, "html.parser")

            kanji_entries = soup.find_all("div", class_="kanji_light_content")

            if not kanji_entries:
                break

            for entry in kanji_entries:
                kanji = entry.select_one(".literal_block a").get_text()
                meanings = find_records(entry, "meanings")
                kun_readings = find_records(entry, "kun")
                on_readings = find_records(entry, "on")

                kanji_list.append(
                    {
                        "kanji": kanji,
                        "level": level,
                        "meanings": meanings,
                        "kun_readings": transform_reading(kun_readings),
                        "on_readings": transform_reading(on_readings),
                    }
                )

            page_number += 1

    return kanji_list
