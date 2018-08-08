import { Vue } from 'vue-property-decorator';
export default class HelloVue extends Vue {
    /** props */
    private val;
    /** emit */
    clickButton(val: string): void;
    /** data */
    value: string;
    inputValue: string;
    /** lifecylce hook */
    mounted(): void;
    /** computed */
    readonly isDisabled: boolean;
    /** method */
    handleInput($event: any): void;
    handleClick(): void;
}
