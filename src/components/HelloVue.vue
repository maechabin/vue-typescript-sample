<template>
  <div>
    <h1>Hello {{ value }}</h1>
    <input type="text" v-bind:value="inputValue" v-on:input="handleInput($event)" />
    <button v-on:click="handleClick()" v-bind:disabled="isDisabled">button</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';

@Component
export default class HelloVue extends Vue {
  /** props */
  @Prop() private val!: string;

  /** emit */
  @Emit('handle-click')
  clickButton(val: string): void {}

  /** watch */
  @Watch('value')
  onValueChange(newValue: string, oldValue: string): void {
    console.log(`watch: ${newValue}, ${oldValue}`);
  }

  /** data */
  value: string = this.val;
  inputValue: string = '';

  /** lifecylce hook */
  mounted() {
    console.log('mounted');
  }

  /** computed */
  get isDisabled(): boolean {
    return this.inputValue === '';
  }

  /** method */
  handleInput($event: any): void {
    this.inputValue = $event.target.value;
  }
  handleClick(): void {
    if (this.inputValue === '') {
      return;
    }
    this.value = this.inputValue;
    this.inputValue = '';
    this.clickButton(this.value);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
