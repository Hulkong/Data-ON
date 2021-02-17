<template>
  <client-only>
    <mavon-editor ref=md language="en" v-model="editor_value" @imgAdd="$imgAdd" />
  </client-only>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', [
      'getAuth'
    ])
  },
  props: ['value', 'menu'],
  data() {
    return {
      editor_value: ''
    }
  },
  watch: {
    value: function() {
      this.editor_value = this.value
    },
    editor_value: function() {
      this.$emit('update:value', this.editor_value)
    }
  },
  methods: {
    ...mapActions(['setPost']),

    $imgAdd: async function(pos, $file) {
      if ($file.name.includes(' ')) {
        let check_blank = false

        this.editor_value = this.editor_value.replace('!['+$file._name+']('+pos+')', '')

        this.$alert('파일 이름에 공백이 포함될 수 없습니다.', {
          callback: function() {
            check_blank = true
          }
        })

        if (check_blank) {
          return false
        }
      }

      const formData = new FormData()

      formData.append('filename', $file)
      formData.append('appname', this.menu)

      const posts = {
          'url': '/api/files/imageUpload/',
          'param': formData,
          'config': {
            headers: {
              'Authorization': 'Token ' + this.getAuth.token,
              'Content-Type': 'multipart/form-data'
            }
          }
        }

      let result = await this.setPost(posts)

      if (result) {
        this.$refs.md.$img2Url(pos, result.data[0].file_url)
      }
    }
  }
}
</script>
