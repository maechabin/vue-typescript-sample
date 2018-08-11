import { Wrapper, shallowMount } from '@vue/test-utils';
import HelloVue from '@/components/HelloVue.vue';

describe('HelloVue.vue', () => {
  let wrapper: Wrapper<HelloVue>;

  it('props', () => {
    const val = 'Vue';
    wrapper = shallowMount(HelloVue, {
      propsData: { val },
    });

    expect(wrapper.props().val).toBe(val);
    expect(wrapper.text()).toMatch(`Hello ${val}`);
  });

  it('dom', () => {
    wrapper = shallowMount(HelloVue);

    expect(wrapper.contains('h1')).toBeTruthy();
    expect(wrapper.contains('input')).toBeTruthy();
    expect(wrapper.contains('button')).toBeTruthy();
  });

  it('button: v-bind:disabled', () => {
    wrapper = shallowMount(HelloVue);
    wrapper.setData({ inputValue: '' });
    expect(wrapper.find('button').element.getAttribute('disabled')).toBeTruthy();
  });

  describe('event', () => {
    beforeEach(() => {
      wrapper = shallowMount(HelloVue);
    });

    it('should call handleInput', () => {
      const spy = jest.spyOn(wrapper.vm, 'handleInput');
      wrapper.find('input').trigger('input');
      expect(spy).toHaveBeenCalled();
    });

    it('should call hancleClick', () => {
      const spy = jest.spyOn(wrapper.vm, 'handleClick');
      wrapper.setData({ inputValue: 'AAA' });
      wrapper.find('button').trigger('click');

      expect(spy).toHaveBeenCalled();
    });

    it('should not call handleClick', () => {
      wrapper = shallowMount(HelloVue);
      const spy = jest.spyOn(wrapper.vm, 'handleClick');
      wrapper.setData({ inputValue: '' });
      wrapper.find('button').trigger('click');

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('watch', () => {
    it('onValueChange', () => {
      wrapper = shallowMount(HelloVue, {
        propsData: { val: 'AAA' },
      });
      const spy = jest.spyOn(console, 'log');
      wrapper.setData({ value: 'BBB' });

      expect(wrapper.vm.value).toBe('BBB');
      expect(spy).toHaveBeenCalledWith('watch: BBB, AAA');
      spy.mockClear();
    });
  });

  describe('mounted', () => {
    it('console.log', () => {
      const spy = jest.spyOn(console, 'log');
      shallowMount(HelloVue);
      expect(spy).toHaveBeenCalled();
      spy.mockClear();
    });
  });

  describe('computed: isDisabled', () => {
    beforeEach(() => {
      wrapper = shallowMount(HelloVue);
    });

    it('sholud be true', () => {
      wrapper.setData({ inputValue: '' });
      const disabled = wrapper.vm.isDisabled;

      expect(disabled).toBeTruthy();
    });

    it('sholud be false', () => {
      wrapper.setData({ inputValue: 'AAA' });
      const disabled = wrapper.vm.isDisabled;

      expect(disabled).toBeFalsy();
    });
  });

  describe('method', () => {
    beforeEach(() => {
      wrapper = shallowMount(HelloVue);
    });

    it('handleInput', () => {
      const event = {
        target: { value: 'AAA' },
      };
      wrapper.vm.handleInput(event);
      expect(wrapper.vm.inputValue).toBe('AAA');
    });

    it('handleClick', () => {
      wrapper.setData({ inputValue: 'AAA' });
      const spy = jest.spyOn(wrapper.vm, '$emit');
      wrapper.vm.handleClick();

      expect(wrapper.vm.value).toBe('AAA');
      expect(wrapper.vm.inputValue).toBe('');
      expect(spy).toHaveBeenCalledWith('handle-click', 'AAA');
    });
  });

  describe('snapshot', () => {
    it('HelloVue', () => {
      wrapper = shallowMount(HelloVue);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
