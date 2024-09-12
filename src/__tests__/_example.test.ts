describe('primer test',()=>{
    test('debe revisar que 1+1 =2',()=>{
        expect(1+1).toBe(2)
    })

    test('debe revisar que 1+1 != 2',()=>{
        expect(1+1).not.toBe(3)
    })
})