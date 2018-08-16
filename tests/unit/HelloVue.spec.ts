import { Wrapper, shallowMount } from '@vue/test-utils';
import HelloVue from '@/components/HelloVue.vue';

describe('HelloVue.vue', () => {
  /** ラッパー変数の宣言 */
  let wrapper: Wrapper<HelloVue>;

  it('propsで受け取る値のテスト', () => {
    const val = 'Vue';
    wrapper = shallowMount(HelloVue, {
      propsData: { val },
    });

    expect(wrapper.props().val).toBe(val);
    expect(wrapper.text()).toMatch(`Hello VUE`);
  });

  it('描画されるDOMのテスト', () => {
    wrapper = shallowMount(HelloVue);

    expect(wrapper.contains('h1')).toBeTruthy();
    expect(wrapper.contains('input')).toBeTruthy();
    expect(wrapper.contains('button')).toBeTruthy();
  });

  it('ボタンの非活性のテスト', () => {
    wrapper = shallowMount(HelloVue);
    wrapper.setData({ inputValue: '' });
    expect(wrapper.find('button').element.getAttribute('disabled')).toBeTruthy();
  });

  describe('イベントのテスト', () => {
    beforeEach(() => {
      wrapper = shallowMount(HelloVue);
    });

    it('テキスト入力時にhandleInputが呼ばれるかテスト', () => {
      const spy = jest.spyOn(wrapper.vm, 'handleInput');
      wrapper.find('input').trigger('input');
      expect(spy).toHaveBeenCalled();
    });

    it('ボタン押下時にhandleClickが呼ばれるかテスト', () => {
      const spy = jest.spyOn(wrapper.vm, 'handleClick');
      wrapper.setData({ inputValue: 'AAA' });
      wrapper.find('button').trigger('click');

      expect(spy).toHaveBeenCalled();
    });

    it('入力なしの状態でhandleClickが呼ばれないかテスト', () => {
      wrapper = shallowMount(HelloVue);
      const spy = jest.spyOn(wrapper.vm, 'handleClick');
      wrapper.setData({ inputValue: '' });
      wrapper.find('button').trigger('click');

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('watcherのテスト', () => {
    it('valueの値が変更された時にwatchが機能するかテスト', () => {
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

  describe('Lifecycle Hookのテスト', () => {
    it('マウント時に mountedが機能するかテスト', () => {
      const spy = jest.spyOn(console, 'log');
      shallowMount(HelloVue);
      expect(spy).toHaveBeenCalled();
      spy.mockClear();
    });
  });

  describe('computedのテスト', () => {
    beforeEach(() => {
      wrapper = shallowMount(HelloVue);
    });

    it('isDisabledがtrueを返すかテスト', () => {
      wrapper.setData({ inputValue: '' });
      const disabled = wrapper.vm.isDisabled;

      expect(disabled).toBeTruthy();
    });

    it('isDisabledがfalseを返すかテスト', () => {
      wrapper.setData({ inputValue: 'AAA' });
      const disabled = wrapper.vm.isDisabled;

      expect(disabled).toBeFalsy();
    });
  });

  describe('methodのテスト', () => {
    beforeEach(() => {
      wrapper = shallowMount(HelloVue);
    });

    it('handleInputメソッドのテスト', () => {
      const event = {
        target: { value: 'AAA' },
      };
      wrapper.vm.handleInput(event);
      expect(wrapper.vm.inputValue).toBe('AAA');
    });

    it('handleClickメソッドのテスト', () => {
      wrapper.setData({ inputValue: 'AAA' });
      const spy = jest.spyOn(wrapper.vm, '$emit');
      wrapper.vm.handleClick();

      expect(wrapper.vm.value).toBe('AAA');
      expect(wrapper.vm.inputValue).toBe('');
      expect(spy).toHaveBeenCalledWith('handle-click', 'AAA');
    });
  });

  describe('filtersのテスト', () => {
    it('アッパーケースに変換されるかテスト', () => {
      wrapper = shallowMount(HelloVue, {
        propsData: { val: '' },
      });
      wrapper.setData({ value: 'Bbb' });
      const received = wrapper.find('h1').text();
      expect(received).toBe('Hello BBB');
    });
  });

  describe('スナップショットテスト', () => {
    it('HelloVueテンプレートのスナップショット', () => {
      wrapper = shallowMount(HelloVue);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
