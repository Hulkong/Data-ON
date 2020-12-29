<template>
  <client-only>
    <mavon-editor ref=md language="en" v-model="editor_model" @imgAdd="$imgAdd" />
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
  props: ['model'],
  data() {
    return {
      editor_model: ''
    }
  },
  watch: {
    model: function() {
      this.editor_model = this.model
    },
    editor_model: function() {
      this.$emit('update:model', this.editor_model)
    }
  },
  methods: {
    ...mapActions(['setPost']),

    $imgAdd: async function(pos, $file) {
      if ($file.name.includes(' ')) {
        let check_blank = false

        this.editor_model = this.editor_model.replace('!['+$file._name+']('+pos+')', '')

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

      const posts = {
          'url': '/api/notices/noticeImage/',
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
