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

        it('should lex titles', function () {
            const text = "# Title";
            var lexer = new marked.Lexer();
            var tokens = lexer.lex(text);
            expect(tokens).toEqual([{ begin: 0, depth: 1, end: 7, text: 'Title', type: 'heading' }]);
        });

    });

    describe('list', function () {

        it('should lex a one element list', function () {
            const text = "* i";
            var lexer = new marked.Lexer();
            var tokens = lexer.lex(text);
            expect(tokens).toEqual([
                {begin: 0, end: 0, ordered: false, type: 'list_start'},
                {begin: 0, end: 0, type: 'list_item_start'},
                {begin: 2, end: 3, text: 'i', type: 'text'},
                {begin: 3, end: 3, type: 'list_item_end'},
                {begin: 3, end: 3, type: 'list_end'}
            ]);
        });

        it('should lex a two elements list', function () {
            const text = "* i\n* j";

            var lexer = new marked.Lexer();
            var tokens = lexer.lex(text);
            expect(tokens).toEqual([
                {begin: 0, end: 0, ordered: false, type: 'list_start'},
                {begin: 0, end: 0, type: 'list_item_start'},
                {begin: 2, end: 3, text: 'i', type: 'text'},
                {begin: 3, end: 3, type: 'list_item_end'},
                {begin: 4, end: 4, type: 'list_item_start'},
                {begin: 6, end: 7, text: 'j', type: 'text'},
                {begin: 7, end: 7, type: 'list_item_end'},
                {begin: 7, end: 7, type: 'list_end'}
            ]);
        });

        it('should lex a two elements list', function () {
            const text = "* i\n* j\n* item";

            var lexer = new marked.Lexer();
            var tokens = lexer.lex(text);
            expect(tokens).toEqual([
                {begin: 0, end: 0, ordered: false, type: 'list_start'},
                {begin: 0, end: 0, type: 'list_item_start'},
                {begin: 2, end: 3, text: 'i', type: 'text'},
                {begin: 3, end: 3, type: 'list_item_end'},
                {begin: 4, end: 4, type: 'list_item_start'},
                {begin: 6, end: 7, text: 'j', type: 'text'},
                {begin: 7, end: 7, type: 'list_item_end'},
                {begin: 8, end: 8, type: 'list_item_start'},
                {begin: 10, end: 14, text: 'item', type: 'text'},
                {begin: 14, end: 14, type: 'list_item_end'},
                {begin: 14, end: 14, type: 'list_end'}
            ]);
        });


    });
});
