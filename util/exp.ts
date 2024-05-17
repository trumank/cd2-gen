type BinaryOp = "+" | "-" | "*" | "/";

export type ASTNode = {
  type: "Number";
  value: number;
} | {
  type: "BinaryOperation";
  value: BinaryOp;
  left: ASTNode;
  right: ASTNode;
} | {
  type: "FunctionCall";
  value: string;
  args: ASTNode[];
};

export function parse(expression: string): ASTNode {
  const tokens =
    expression.match(/(?:\d+|\+|\-|\*|\/|\(|\)|,|[a-zA-Z_]\w*)/g) || [];
  let i = 0;

  function next(): string {
    return tokens[i++];
  }
  function peek(): string {
    return tokens[i];
  }

  function parseNumber(token: string): ASTNode {
    return { type: "Number", value: parseFloat(token) };
  }

  function parseFactor(): ASTNode {
    const currentToken = next();
    if (currentToken === "(") {
      const node = parseExpression();
      if (next() !== ")") {
        throw new Error('Expected ")"');
      }
      return node;
    } else if (/^\d+$/.test(currentToken)) {
      return parseNumber(currentToken);
    } else if (/^[a-zA-Z_]\w*$/.test(currentToken)) {
      return {
        type: "FunctionCall",
        value: currentToken,
        args: parseArguments(),
      };
    } else {
      throw new Error("Unexpected token: " + currentToken);
    }
  }

  function parseArguments(): ASTNode[] {
    const args: ASTNode[] = [];
    if (next() !== "(") {
      throw new Error('Expected "("');
    }
    while (peek() !== ")") {
      args.push(parseExpression());
      if (peek() === ",") {
        next();
      } else if (peek() !== ")") {
        throw new Error('Expected "," or ")"');
      }
    }
    next();
    return args;
  }

  function parseTerm(): ASTNode {
    let node = parseFactor();

    while (true) {
      const op = peek();
      if (op != "*" && op != "/") break;
      next();
      node = {
        type: "BinaryOperation",
        value: op,
        left: node,
        right: parseFactor(),
      };
    }

    return node;
  }

  function parseExpression(): ASTNode {
    let node = parseTerm();

    while (true) {
      const op = peek();
      if (op != "+" && op != "-") break;
      next();
      node = {
        type: "BinaryOperation",
        value: op,
        left: node,
        right: parseTerm(),
      };
    }

    return node;
  }

  const ast = parseExpression();
  if (i !== tokens.length) {
    throw new Error("Unexpected token: " + tokens[i]);
  }
  return ast;
}
