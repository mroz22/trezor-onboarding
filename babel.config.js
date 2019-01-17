module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    plugins: [
        'react-hot-loader/babel',
        'transform-flow-strip-types',
        '@babel/plugin-proposal-class-properties',
        ['module-resolver', {
            root: ['./src'],
        }],
    ],
};