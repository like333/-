<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconLink"></use>
  </svg>
</template>
<script>
export default {
  props: {
    name: {
      type: String
    },
    iconname: {
      type: Number
    }
  },
  computed: {
    iconLink() {
      if (this.name) {
        var ext = /\.[^\.]+$/.exec(this.name)[0]
        switch (ext) {
          case '.txt':
            return "#icon-txt"
          case '.docx':
            return "#icon-word"
          case '.doc':
            return "#icon-word"
          case '.xlsx':
            return '#icon-excel'
          case '.xls':
            return '#icon-excel'
          case '.pdf':
            return '#icon-pdf'
        }
      }
      // switch (this.iconname) {
      //   case 1:
      //     return '#icon-del'
      // }

    }
  }
}
</script>
<style>

</style>


