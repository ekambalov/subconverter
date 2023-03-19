let text = "Калі гэта праца Кіры, значыць, ён не ведае нашых\\Nімёнаў і твараў, каб забіць, таму забіў Такімуру.";
if (text.indexOf("\\N") !== -1) {
  text = text.slice(0, text.indexOf("\\N")) + "\n" + text.slice(text.indexOf("\\N") + 2);
}
console.log(text);
