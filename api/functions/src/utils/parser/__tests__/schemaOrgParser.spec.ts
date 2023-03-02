import { first } from 'lodash'
import { parse } from '../schemaOrgParser'

describe('parse', () => {
  it('should return default object', () => {
    const object = {
      name: 'foo',
    }

    expect(parse(object)).toEqual(object)
  })

  it('should return a person name', () => {
    const person = {
      '@type': 'Person',
      name: 'foo',
    }

    expect(parse(person)).toEqual('foo')
  })

  it('should return an array of person name', () => {
    const people = [
      {
        '@type': 'Person',
        name: 'foo',
      },
      {
        '@type': 'Person',
        name: 'bar',
      },
    ]

    expect(parse(people)).toEqual(['foo', 'bar'])
  })

  it('should return the name of the first person', () => {
    const people = [
      {
        '@type': 'Person',
        name: 'foo',
      },
      {
        '@type': 'Person',
        name: 'bar',
      },
    ]

    expect(parse(people, first)).toEqual('foo')
  })

  it('should return the string', () => {
    expect(parse('foo')).toEqual('foo')
  })

  it('should return a imageObject url', () => {
    const imageObject = {
      '@type': 'ImageObject',
      url: 'foo',
    }

    expect(parse(imageObject)).toEqual('foo')
  })

  it('should return the text', () => {
    const howToStep = {
      '@type': 'HowToStep',
      text: 'foo',
    }

    expect(parse(howToStep)).toEqual('foo')
  })

  it('should return the text and remove \n', () => {
    const howToStep = {
      '@type': 'HowToStep',
      text: 'foo\nbar',
    }

    expect(parse(howToStep)).toEqual('foo bar')
  })

  it('should return the sections \n', () => {
    const howToSections = [
      {
        '@type': 'HowToSection',
        itemListElement: [
          {
            '@type': 'HowToStep',
            text: 'foo',
          },
          {
            '@type': 'HowToStep',
            text: 'bar',
          },
        ],
      },
      {
        '@type': 'HowToSection',
        itemListElement: [
          {
            '@type': 'HowToStep',
            text: 'baz',
          },
        ],
      },
    ]

    expect(parse(howToSections)).toEqual(['foo', 'bar', 'baz'])
  })
})
