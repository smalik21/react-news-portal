export const Capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const getFormattedDate = () => {
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }
  return new Date().toLocaleDateString('en-US', options);
}