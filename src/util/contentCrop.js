export default function contentCrop(content) {

  if (content.length < 400)
    return content;
  else {
    var i = 400;
    while (i < content.length && content[i] != ' ')
      i++;
    return content.slice(0, i) + '...';
  }

} 