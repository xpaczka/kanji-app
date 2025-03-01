import json
from sys import argv
from scrape_kanji import scrape_data


if __name__ == "__main__":
    kanji_list = scrape_data()

    with open("data.json", "w", encoding="utf-8") as file:
        file_data = {"data": kanji_list}
        json.dump(file_data, file, ensure_ascii=False, indent=2)

    print("Kanji data saved successfully")
