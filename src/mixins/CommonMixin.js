export default {
  data() {
    return {}
  },
  methods: {
    scrollToTopPage(top, left) {
      window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth"
      });
    },
    arrayChunk(arr, len) {
      var chunks = [], i = 0, n = arr.length;
      while (i < n) {
        chunks.push(arr.slice(i, i += len));
      }
      return chunks;
    },
    textUppercaseAndRemoveWhiteSpace(e) {
      e.target.value = e.target.value.toUpperCase();
      e.target.value = e.target.value.replace(/ /g, '')
    }
  }
}
