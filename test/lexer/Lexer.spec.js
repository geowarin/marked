var expect = require('expect');
var marked = require('../../lib/marked');

describe('Lexer', function () {

    describe('text', function () {

        it('should lex simple text', function () {
            const text = "Some text";
            var lexer = new marked.Lexer();
            var tokens = lexer.lex(text);
            expect(tokens).toEqual([{begin: 0, end: 9, text: 'Some text', type: 'paragraph'}]);
        });

    });

    describe('list', function () {

        it('should lex a one element list', function () {
            const text = "* item";
            var lexer = new marked.Lexer();
            var tokens = lexer.lex(text);
            expect(tokens).toEqual([
                {begin: 0, end: 0, ordered: false, type: 'list_start'},
                {begin: 2, end: 2, type: 'list_item_start'},
                {begin: 2, end: 6, text: 'item', type: 'text'},
                {begin: 6, end: 6, type: 'list_item_end'},
                {begin: 6, end: 6, type: 'list_end'}
            ]);
        });

        it('should lex a two elements list', function () {
            const text = "* i\n* j";

            var lexer = new marked.Lexer();
            var tokens = lexer.lex(text);
            expect(tokens).toEqual([
                {begin: 0, end: 0, ordered: false, type: 'list_start'},
                {begin: 2, end: 2, type: 'list_item_start'},
                {begin: 2, end: 3, text: 'i', type: 'text'},
                {begin: 3, end: 3, type: 'list_item_end'},
                {begin: 4, end: 4, type: 'list_item_start'},
                {begin: 6, end: 7, text: 'j', type: 'text'},
                {begin: 7, end: 7, type: 'list_item_end'},
                {begin: 7, end: 7, type: 'list_end'}
            ]);
        });
    });
});
