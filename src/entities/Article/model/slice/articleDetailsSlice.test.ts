import { ArticleDetailsSchema } from "../types/ArticleDetailsSchema";
import type { Article } from '../types/Article';
import { ArticleBlockType, ArticleType } from '../consts/consts';
import { articleDetailsReducer } from "./articleDetailsSlice";
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';


const article: Article = {
    id: "1",
    title: "Test article test article test article",
    subtitle: "Test article test article test article",
    img: '',
    views: 100,
    user: {
        id: '1',
        username: 'admin'
    },
    createdAt: "01.01.0001",
    type: [ArticleType.IT],
    blocks: [
        {
            id: "1",
            type: ArticleBlockType.TEXT,
            title: "test text block",
            paragraphs: [
                // eslint-disable-next-line max-len
                "     Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eros metus, aliquet a nisi at, rutrum aliquam lectus. Integer ornare ictum libero, a auctor dui bibendum eget. Nullam imperdiet ipsum quis lacus posuere sodales. Cras non malesuada sapien. Phasellus consectetur luctus sem, gravida elementum leo tempor ut. Nullam nec suscipit nulla, vitae porta neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas varius lorem vitae leo placerat placerat. Sed eu molestie est, vitae efficitur justo. Nulla fermentum metus lorem, in sagittis lorem pharetra at.",
            ]
        }
    ]
}

describe('profileSlice.test', () => {

    // simple reducers
    // test('should ___ work', () => {
    //     const state: DeepPartial<ArticleDetailsSchema> = {
            
    //     };
    //     expect(
            
    //     ).toEqual()
    // });

    
    

    //extra reducers (btw it tested in loginByUsername.test.ts)
    test('should fetchArticleById.pending change isLoading', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
        };
        expect(
            articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.pending)
        ).toEqual({
            error: undefined,
            isLoading: true
        })
    });

    test('should fetchArticleById.fulfilled change state', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
            data: undefined,
        };
        expect(
            articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.fulfilled(article, '', ''))
        ).toEqual({
            isLoading: false,
            data: article,
        })
    });

    test('should fetchArticleById.rejected change state', () => { // fix later
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
            error: undefined,
        };
        expect(
            articleDetailsReducer(state as ArticleDetailsSchema,fetchArticleById.rejected)
        ).toEqual({
            isLoading: false,
            error: undefined,
        })
    });

});
