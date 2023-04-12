import {createMetadatas} from "../services/createNFTicket";
import {formDataType} from "../models/interfaces/createNFTFormData";


describe( 'Home', () => {
    it( 'adds 1 + 2 to equal 3', () => {
        expect( 1 + 2 ).toBe( 3 );
    } );
} )

it('create medatatas',() => {
    const formData:formDataType = {
        name:'name',
        description:'description',
        hourEnd: 'hourEnd',
        location: 'location',
        hourStart: 'hourStart',
        date: 'date',
        count:5,
        price:'0.01',
        image:'imageUrl'
    }
    const metaData = {
        name: formData.name,
        description: formData.description,
        image: 'imageUrl',
        properties: {
            hourEnd: formData.hourEnd,
            location: formData.location,
            hourStart: formData.hourStart,
            date: formData.date,
        },
    }
    const metaDatasTest = []

    for ( let i = 0; i < formData.count; i++ ) {
        metaDatasTest.push( metaData )
    }
    console.log(metaDatasTest)
    const metadatas = createMetadatas(formData,'imageUrl')
    expect(metadatas).toEqual(metaDatasTest)
})
