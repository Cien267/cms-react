export const randomAvatarColor = (
  listColor = ['#E57373', '#64B5F6', '#7986CB'],
) => {
  return listColor[Math.floor(Math.random() * listColor.length)]
}
