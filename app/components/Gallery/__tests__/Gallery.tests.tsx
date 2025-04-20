import Gallery from '../Gallery';
import {useAppSelector, useAppDispatch} from "@/app/hooks/hooks";
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('@/app/hooks/hooks', () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn()
}));
const mockUseAppSelector = jest.mocked(useAppSelector);
const mockUseAppDispatch = jest.mocked(useAppDispatch);

const mockAlbumLocations = [
    {
        id: '1',
        creationDate: '2023-01-01',
        title: 'Test Album 1',
        images: ['image1.jpg', 'image2.jpg']
    },
    {
        id: '2',
        creationDate: '2023-01-02',
        title: 'Test Album 2',
        images: ['image3.jpg']
    }
];

describe('<Gallery />', () => {
    
    
    beforeEach(() => {
        mockUseAppSelector.mockReturnValue(mockAlbumLocations);

        const mockDispatch = jest.fn();
        mockUseAppDispatch.mockReturnValue(mockDispatch);
    });

    it('renders all albums from store', () => {
        const {getByText, getAllByText} = render(
            <Gallery/>
        );
        
        expect(getAllByText('Test Album 1')).toBeTruthy();
        expect(getAllByText('Test Album 2')).toBeTruthy();
    });

    it('removes album when remove button is pressed', () => {
        const {getByText, getAllByText} = render(
            <Gallery/>
        );
        
        const removeButtons = getAllByText('Remove');
        fireEvent.press(removeButtons[0]);

        expect(mockUseAppDispatch).toHaveBeenCalled();
    });

    it('renders empty list when no albums exist', () => {
        mockUseAppSelector.mockReturnValue([]);
        const {getByText, getAllByText} = render(
            <Gallery/>
        );

        expect(getAllByText('Test Album 1')).not.toBeTruthy();
    });
});
