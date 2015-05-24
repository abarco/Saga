"use strict";

var _ = require('underscore');

var PREFIX = {
    t1: 'Comment',
    t2: 'Account',
    t3: 'Link',
    t4: 'Message',
    t5: 'Subreddit',
    t6: 'Award'
};

var domain = 'http://www.reddit.com';

var lib = {
    listingMapper: function (listings) {
        if(listings && listings.kind === 'Listing'){
            var data = listings.data;
            var children = data.children;

            return {
                children: this.childrenMapper(children)
            }
        }
        else {
            return {};
        }
    },

    childrenMapper: function (children) {

        if(children) {

            var list = _.map(children, function (child) {
                var data = child.data;
                return {
                    title: data.title,
                    id: data.id,
                    type: PREFIX[child.kind],
                    author: data.author,
                    name: data.name,
                    num_comments: data.num_comments,
                    comments_link: domain + data.permalink,
                    sub: data.subreddit,
                    thumbnail: data.thumbnail,
                    content_link: data.url
                }
            });

            return list;
        }
        else{
            return [];
        }

    }

};

module.exports = lib;