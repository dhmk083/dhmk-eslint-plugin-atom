const { ESLintUtils } = require("@typescript-eslint/utils");
const ts = require("typescript");

const tryGet = (fn) => {
  try {
    return fn();
  } catch (e) {}
};

const message = "Probably missing () on atom type.";

const isAtom = (fqn) => /@dhmk\/atom/.test(fqn) && /\"\.(\w+)?Atom/.test(fqn);

module.exports = {
  rules: {
    "missing-call": {
      create(context) {
        const parser = ESLintUtils.getParserServices(context);
        const checker = parser.program.getTypeChecker();

        return {
          Identifier(node) {
            const tsNode = parser.esTreeNodeToTSNodeMap.get(node);
            const { parent } = tsNode;
            const type = checker.getTypeAtLocation(tsNode);
            const fqn = tryGet(() =>
              checker.getFullyQualifiedName(type.symbol)
            );

            if (!isAtom(fqn)) return;

            const shouldReport =
              ts.isPrefixUnaryExpression(parent) ||
              ts.isBinaryExpression(parent) ||
              ts.isIfStatement(parent) ||
              ts.isSwitchStatement(parent) ||
              (ts.isPropertyAccessExpression(parent) &&
                parent.name.text === "length");

            if (shouldReport)
              context.report({
                node,
                message,
              });
          },
        };
      },
    },
  },
};
