import { Vue } from 'vue-property-decorator';
export default class HelloVue extends Vue {
    /** props */
    private val;
    /** emit */
    clickButton(val: string): void;
    /** watch */
    onValueChange(newValue: string, oldValue: string): void;
    /** data */
    value: string;
    inputValue: string;
    /** lifecylce hook */
    mounted(): void;
    /** computed */
    readonly isDisabled: boolean;
    /** methods */
    handleInput($event: Event): void;
    handleClick(): void;
}
