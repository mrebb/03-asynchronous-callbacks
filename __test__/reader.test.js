'use strict';

const reader = require('../lib/reader.js');
const path = require('path');
__dirname = path.resolve('data');

describe('reader.readFile module', () => {
  it('should callback with file contents of one file', (done) => {
    const expected = 'Development environment log'; 
    let file = [__dirname + '/dev.txt'];
    reader.readFile(file, (err, data) => {
      expect(err).toBeNull();
      expect(data[0]).toBe(expected);
      done();
    });
  });
  it('should callback with error for a non-existent file', (done) => {
    reader.readFile(['noFile.txt'], (err,data) => {
      expect(err).not.toBeNull();
      expect(data).toBeUndefined;
      done();
    });
  });
  it('should callback with the content of type string', (done) => {
    let file = [`${__dirname}/production.txt`];
    reader.readFile(file, (err,data) => {
      expect(err).toBeNull();
      expect(typeof data[0]).toEqual('string');
      done();
    });
  });
  it('should callback with the content when passed file path using array having only one element', (done) => {
    let file = [`${__dirname}/test.txt`];
    reader.readFile(file, (err,data) => {
      expect(err).toBeNull();
      const actual = data[0];
      const expected = 'QA environment log';
      expect(actual).toEqual(expected);
      done();
    });
  });
  it('should callback with the content when passed file having lot of data', (done) => {
    let file = [`${__dirname}/cucumbers.txt`];
    reader.readFile(file, (err,data) => {
      expect(err).toBeNull();
      const actual = data[0];
      const expected = 'cucumber';
      expect(actual.startsWith(expected)).toEqual(true);
      done();
    });
  });

  it('should callback with the content when passed array of file paths', (done) => {
    let paths=[],expected = ['Development environment log','production environment log','QA environment log'];
    for(let file of ['dev','production','test']){
      paths.push(`${__dirname}/${file}.txt`);
    }
    reader.readFile(paths, (err,data) => {
      for(let i=0; i<data.length;i++){
        expect(err).toBeNull();
        expect(data[i]).toEqual(expected[i]);
      }
      done();
    });
  });
  //Strech goal
  it('should callback with the content when passed data directory for recursive ', (done) => {
    let paths= [], expected = ['Development environment log','production environment log','QA environment log'];
    reader.readDir(__dirname,(err,files) => {
      for(let file of files){
        paths.push(`${__dirname}/${file}`);
      }
      reader.readFile(paths, (err,data) => {
        for(let i=1; i<data.length;i++){
          expect(err).toBeNull();
          expect(data[i]).toEqual(expected[i-1]);
        }
        done();
      });
    });
  });
} );  