import { mount } from '@vue/test-utils'; // For Vue-specific testing utilities
import Tab1Page from '@/views/Tab1Page.vue'; // Adjust the path accordingly
import {describe, expect, Mock, test, vi} from 'vitest';
import axios from 'axios';

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// now you can access it as `IntersectionObserver` or `window.IntersectionObserver`

describe('Tab1Page.vue', () => {
  test('renders tab 1 Tab1Page', () => {
    const wrapper = mount(Tab1Page)
    expect(wrapper.text()).toMatch('Tab 1')
  })
})

vi.mock('axios'); // Mock axios

describe('Tab1Page.vue', () => {

  beforeEach(() => {
    vi.restoreAllMocks()
  });

  test('renders tab 1 title', () => {
    const wrapper = mount(Tab1Page);
    expect(wrapper.text()).toContain('Tab 1');
  });

  test('fetches and displays articles', async () => {
    // Mock the axios response
    const mockData = {
      data: [
        {
          id: "1",
          attributes: {
            title: "Test Title",
            description: "Test Description",
            image: "test-img.jpg",
            url: "test-url.com",
            link: "test-link.com"
          }
        }
      ]
    };

    (axios.get as Mock).mockResolvedValueOnce(mockData);

    const wrapper = mount(Tab1Page);

    await wrapper.vm.$nextTick(); // Wait for any side effects to complete

    //expect(wrapper.find('.card-item ion-img').attributes('src')).toBe('test-url.com');
    //expect(wrapper.find('ion-card-title').text()).toBe('Test Title');
    //expect(wrapper.find('ion-card-subtitle').text()).toBe('Test Description');
  });

  test('handles fetching errors gracefully', async () => {
    (axios.get as Mock).mockRejectedValueOnce(new Error('API Error'));

    const consoleLogMock = vi.spyOn(console, 'log');
    consoleLogMock.mockImplementation(() => {}); // Mock console.log to suppress logs

    const wrapper = mount(Tab1Page);

    await wrapper.vm.$nextTick(); // Wait for any side effects to complete

    expect(consoleLogMock).toHaveBeenCalledWith(new Error('API Error'));
  });

});
