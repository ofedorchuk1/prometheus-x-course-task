import {describe, expect, test} from "@jest/globals";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {DataContext} from "../../context";
import FullBook from "./index";
import React from "react";
import Router, {useParams} from "react-router-dom";
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));
describe('Button testing', ()=>{
    const contextValue = {
        bookList: [ {"id": 1,
            "author": "David Flanagan",
            "price": 10.99,
            "image": "https://courses.prometheus.org.ua/asset-v1:Ciklum+FEB101+2022_T3+type@asset+block@javascript_the_definitive_guide.jpg",
            "title": "Title",
            "shortDescription": "JavaScript is the programming language of the web and is used by more software developers today than any other programming language.",
            "description": "JavaScript is the programming language of the web and is used by more software developers today than any other programming language. For nearly 25 years this best seller has been the go-to guide for JavaScript programmers. The seventh edition is fully updated to cover the 2020 version of JavaScript, and new chapters cover classes, modules, iterators, generators, Promises, async/await, and metaprogramming. You’ll find illuminating and engaging example code throughout. This book is for programmers who want to learn JavaScript and for web developers who want to take their understanding and mastery to the next level. It begins by explaining the JavaScript language itself, in detail, from the bottom up. It then builds on that foundation to cover the web platform and Node.js."
        }],
        cart: [],
        setCart: [],
    };

    test('Increment value', async ()=>{

        jest.spyOn(Router, 'useParams').mockReturnValue({ id: "1" });
        render( <DataContext.Provider value={contextValue}>
                <FullBook/>
            </DataContext.Provider>
        )
        const increment = screen.getByTestId('increment')
        const value = screen.getByTestId('value')
        expect(increment).toBeTruthy()
        await waitFor(()=>{
            expect(value.value).toBe('1')
        })
        fireEvent.click(increment)
        await waitFor(()=>{
            expect(value.value).toBe('2')
        })

    })
    test('Decrement value', async ()=>{
        jest.spyOn(Router, 'useParams').mockReturnValue({ id: "1" });
        render( <DataContext.Provider value={contextValue}>
                <FullBook/>
            </DataContext.Provider>
        )
        const increment = screen.getByTestId('increment')
        const value = screen.getByTestId('value')
        const decrement = screen.getByTestId('decrement')
        expect(decrement).toBeTruthy()

        await waitFor(()=>{
            expect(value.value).toBe('1')
        })
        fireEvent.click(increment)
        await waitFor(()=>{
            expect(value.value).toBe('2')
        })
        fireEvent.click(decrement)
        await waitFor(()=>{
            expect(value.value).toBe('1')
        })
    })

    test('changing total price', async()=>{
        jest.spyOn(Router, 'useParams').mockReturnValue({ id: "1" });
        render( <DataContext.Provider value={contextValue}>
                <FullBook/>
            </DataContext.Provider>
        )
        const increment = screen.getByTestId('increment')
        const value = screen.getByTestId('value')
        const decrement = screen.getByTestId('decrement')
        const totalPrice = screen.getByTestId('totalPrice')
        const price = screen.getByTestId('price')

        expect(totalPrice).toBeTruthy()
        expect(price).toBeTruthy()

        await waitFor(()=>{
            expect(price.textContent).toBe('10.99')
        })

        fireEvent.click(increment)
        await waitFor(()=>{
            expect(totalPrice.textContent).toBe('21.98')
        })

        fireEvent.click(increment)
        await waitFor(()=>{
            expect(totalPrice.textContent).toBe('32.97')
        })

        fireEvent.click(decrement)
        await waitFor(()=>{
            expect(totalPrice.textContent).toBe('21.98')
        })

    })
})