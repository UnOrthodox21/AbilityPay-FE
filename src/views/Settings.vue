<template>
  <SettingsBanner/>
  <SettingsForm v-bind:user="user" v-bind:keyboardNavigationOptimization="keyboardNavigationOptimization"/>
</template>

<script>
import SettingsBanner from '../components/settings/SettingsBanner.vue';
import SettingsForm from '../components/settings/SettingsForm.vue';

export default {
  name: "Settings",
  components: {
    SettingsBanner,
    SettingsForm
  },
  props: ["user", "keyboardNavigationOptimization"]
}
</script>

<style scoped>

</style>