%{
const {Assignment} = require("../expressions/declaration-assignment/assignment");
const {DeclarationType} = require("../expressions/declaration-assignment/declarationType");
const {Declaration} = require("../expressions/declaration-assignment/declaration");
const {DoWhile} = require("../statements/control-flow/iterative/doWhile");
const {For} = require("../statements/control-flow/iterative/for");
const {Identifier} = require("../expressions/identifier/identifier");
const {IfElse} = require("../statements/control-flow/conditionals/ifElse");
const {OperationType} = require("../expressions/operation/operationType");
const {Operation} = require("../expressions/operation/operation");
const {Print} = require("../statements/output/print");
const {Switch} = require("../statements/control-flow/conditionals/switch");
const {Variable} = require("../expressions/declaration-assignment/variable");
const {While} = require("../statements/control-flow/iterative/while");
const {interpreterErrorsList} = require("../tables/errors/interpreterErrorsList");
%}

%lex

%options case-insensitive

/* gramática léxica */

%%

/* caracteres de escape */
"\\'"                           return 'SINGLE_QUOTE';
"\\\""                          return 'DOUBLE_QUOTE';
"\\n"                           return 'NEWLINE';
"\\r"                           return 'RETURN';
"\\t"                           return 'TAB';
"\\"                            return 'BACKSLASH';

/* comentarios */
\/\*[^>]*\*\/                   /* ignorar comentario de bloque */
\/\/.*                          /* ignorar comentario de línea */

/* datos no primitivos */
\"[^\"]*\"                      return 'STRING_VALUE';

/* datos primitivos */
[0-9]+\.[0-9]+                  return 'DOUBLE_VALUE';
[0-9]+                          return 'INT_VALUE';
\'.?\'                          return 'CHAR_VALUE';

/* operadores aritméticos */
"%"                             return 'MODULUS';
"*"                             return 'MULTIPLICATION';
"++"                            return 'INCREMENT';
"+"                             return 'ADDITION';
"--"                            return 'DECREMENT';
"-"                             return 'SUBTRACTION';
"/"                             return 'DIVISION';
"^"                             return 'EXPONENTIATION';

/* operadores relacionales */
"!="                            return 'INEQUALITY';
"<="                            return 'LESS_THAN_OR_EQUAL_TO';
"<"                             return 'LESS_THAN';
"=="                            return 'EQUALITY';
">="                            return 'GREATER_THAN_OR_EQUAL_TO';
">"                             return 'GREATER_THAN';

/* operadores lógicos */
"!"                             return 'NOT';
"&&"                            return 'AND';
"||"                            return 'OR';

/* palabras reservadas */
"boolean"                       return 'BOOLEAN_KEYWORD';
"break"                         return 'BREAK';
"case"                          return 'CASE';
"char"                          return 'CHAR_KEYWORD';
"continue"                      return 'CONTINUE';
"default"                       return 'DEFAULT';
"do"                            return 'DO';
"double"                        return 'DOUBLE_KEYWORD';
"else"                          return 'ELSE';
"false"                         return 'FALSE';
"for"                           return 'FOR';
"if"                            return 'IF';
"int"                           return 'INT_KEYWORD';
"length"                        return 'LENGTH';
"list"                          return 'LIST';
"main"                          return 'MAIN';
"new"                           return 'NEW';
"print"                         return 'PRINT';
"return"                        return 'RETURN';
"round"                         return 'ROUND';
"string"                        return 'STRING_KEYWORD';
"switch"                        return 'SWITCH';
"toCharArray"                   return 'TO_CHAR_ARRAY';
"toLower"                       return 'TO_LOWER';
"toString"                      return 'TO_STRING';
"toUpper"                       return 'TO_UPPER';
"true"                          return 'TRUE';
"truncate"                      return 'TRUNCATE';
"typeof"                        return 'TYPE_OF';
"void"                          return 'VOID';
"while"                         return 'WHILE';

/* identificadores */
[a-zA-Z][a-zA-Z_$0-9]*          return 'IDENTIFIER';

/* símbolos y signos */
"("                             return 'LEFT_PARENTHESIS';
")"                             return 'RIGHT_PARENTHESIS';
","                             return 'COMMA';
":"                             return 'COLON';
";"                             return 'SEMICOLON';
"="                             return 'EQUAL_SIGN';
"?"                             return 'QUESTION_MARK';
"["                             return 'LEFT_BRACKET';
"]"                             return 'RIGHT_BRACKET';
"{"                             return 'LEFT_BRACE';
"}"                             return 'RIGHT_BRACE';

/* espacios */
\s                              /* ignorar espacios en blanco */

/* errores */
.                               { interpreterErrorsList.pushError('Léxico', yytext, yylloc.first_line, yylloc.first_column); }

/* fin de línea */
<<EOF>>                         return 'EOF';

/lex

/* asociación de operadores y precedencia */

%right 'DECREMENT' 'INCREMENT'
%right 'NOT' UMINUS
%left 'EXPONENTIATION'
%left 'DIVISION' 'MODULUS' 'MULTIPLICATION'
%left 'ADDITION' 'SUBTRACTION'
%left 'EQUALITY' 'GREATER_THAN' 'GREATER_THAN_OR_EQUAL_TO' 'INEQUALITY' 'LESS_THAN' 'LESS_THAN_OR_EQUAL_TO'
%left 'AND'
%left 'OR'
%token INVALID

%start program

/* gramática sintáctica */

%%

program
    : EOF
    | statements EOF                                                                                                    { return $1; }
    ;

statements
    : statement                                                                                                         { $$ = [$1]; }
    | statements statement                                                                                              { $1.push($2); $$ = $1; }
    ;

statement
    : assignment                                                                                                        { $$ = $1; }
    | built_in                                                                                                          { $$ = $1; }
    | conditional                                                                                                       { $$ = $1; }
    | declaration                                                                                                       { $$ = $1; }
    | iterative                                                                                                         { $$ = $1; }
    | unary SEMICOLON                                                                                                   { $$ = $1; }
    ;

assignment
    : IDENTIFIER EQUAL_SIGN expression SEMICOLON                                                                        { $$ = new Assignment($1, $3, @1.first_line, @1.first_column); }
    ;

built_in
    : print                                                                                                             { $$ = $1; }
    ;

print
    : PRINT LEFT_PARENTHESIS expression RIGHT_PARENTHESIS SEMICOLON                                                     { $$ = new Print($3); }
    ;

expression
    : IDENTIFIER                                                                                                        { $$ = new Identifier($1); }
    | arithmetic                                                                                                        { $$ = $1; }
    | logical                                                                                                           { $$ = $1; }
    | relational                                                                                                        { $$ = $1; }
    | unary                                                                                                             { $$ = $1; }
    | value                                                                                                             { $$ = $1; }
    ;

arithmetic
    : SUBTRACTION expression %prec UMINUS                                                                               { $$ = new Operation(OperationType.NEGATION, $2, null); }
    | expression ADDITION expression                                                                                    { $$ = new Operation(OperationType.ADDITION, $1, $3); }
    | expression DIVISION expression                                                                                    { $$ = new Operation(OperationType.DIVISION, $1, $3); }
    | expression EXPONENTIATION expression                                                                              { $$ = new Operation(OperationType.EXPONENTIATION, $1, $3); }
    | expression MODULUS expression                                                                                     { $$ = new Operation(OperationType.MODULUS, $1, $3); }
    | expression MULTIPLICATION expression                                                                              { $$ = new Operation(OperationType.MULTIPLICATION, $1, $3); }
    | expression SUBTRACTION expression                                                                                 { $$ = new Operation(OperationType.SUBTRACTION, $1, $3); }
    ;

logical
    : NOT expression                                                                                                    { $$ = new Operation(OperationType.NOT, $2, null); }
    | expression AND expression                                                                                         { $$ = new Operation(OperationType.AND, $1, $3); }
    | expression OR expression                                                                                          { $$ = new Operation(OperationType.OR, $1, $3); }
    ;

relational
    : expression EQUALITY expression                                                                                    { $$ = new Operation(OperationType.EQUALITY, $1, $3); }
    | expression GREATER_THAN expression                                                                                { $$ = new Operation(OperationType.GREATER_THAN, $1, $3); }
    | expression GREATER_THAN_OR_EQUAL_TO expression                                                                    { $$ = new Operation(OperationType.GREATER_THAN_OR_EQUAL_TO, $1, $3); }
    | expression INEQUALITY expression                                                                                  { $$ = new Operation(OperationType.INEQUALITY, $1, $3); }
    | expression LESS_THAN expression                                                                                   { $$ = new Operation(OperationType.LESS_THAN, $1, $3); }
    | expression LESS_THAN_OR_EQUAL_TO expression                                                                       { $$ = new Operation(OperationType.LESS_THAN_OR_EQUAL_TO, $1, $3); }
    ;

unary
    : expression DECREMENT                                                                                              { $$ = new Operation(OperationType.DECREMENT, $1, null); }
    | expression INCREMENT                                                                                              { $$ = new Operation(OperationType.INCREMENT, $1, null); }
    ;

value
    : CHAR_VALUE                                                                                                        { $$ = new Variable(DeclarationType.CHAR, $1); }
    | DOUBLE_VALUE                                                                                                      { $$ = new Variable(DeclarationType.DOUBLE, $1); }
    | FALSE                                                                                                             { $$ = new Variable(DeclarationType.BOOLEAN, $1); }
    | INT_VALUE                                                                                                         { $$ = new Variable(DeclarationType.INT, $1); }
    | STRING_VALUE                                                                                                      { $$ = new Variable(DeclarationType.STRING, $1); }
    | TRUE                                                                                                              { $$ = new Variable(DeclarationType.BOOLEAN, $1); }
    ;

conditional
    : if                                                                                                                { $$ = $1; }
    | switch                                                                                                            { $$ = $1; }
    | ternary                                                                                                           { $$ = $1; }
    ;

if
    : else_if                                                                                                           { $$ = $1; }
    | else_if ELSE code_block                                                                                           { $1.else($3); }
    ;

else_if
    : IF LEFT_PARENTHESIS expression RIGHT_PARENTHESIS code_block                                                       { $$ = new IfElse([$3], [$5]); }
    | else_if ELSE IF LEFT_PARENTHESIS expression RIGHT_PARENTHESIS code_block                                          { $1.elseIf($5, $7); }
    ;

code_block
    : LEFT_BRACE statements RIGHT_BRACE                                                                                 { $$ = $2; }
    ;

switch
    : SWITCH LEFT_PARENTHESIS expression RIGHT_PARENTHESIS LEFT_BRACE cases RIGHT_BRACE                                 { $$ = new Switch($3); $$.setCases($6[0].condition, $6[1].statement); }
    | SWITCH LEFT_PARENTHESIS expression RIGHT_PARENTHESIS LEFT_BRACE cases default RIGHT_BRACE                         { $$ = new Switch($3); $$.setCases($6[0].condition, $6[1].statement); $$.setDefault($7); }
    | SWITCH LEFT_PARENTHESIS expression RIGHT_PARENTHESIS LEFT_BRACE default RIGHT_BRACE                               { $$ = new Switch($3); $$.setDefault($7); }
    ;

cases
    : CASE expression COLON statements                                                                                  { $$ = [{condition: [$2]}, {statement: [$4]}]; }
    | cases CASE expression COLON statements                                                                            { $1[0].condition.push($3); $1[1].statement.push($5); $$ = $1; }
    ;

default
    : DEFAULT COLON statements                                                                                          { $$ = $3; }
    ;

declaration
    : data_type IDENTIFIER EQUAL_SIGN expression SEMICOLON                                                              { $$ = new Declaration($1, $2, @1.first_line, @1.first_column); $$.setValue($4); }
    | data_type IDENTIFIER SEMICOLON                                                                                    { $$ = new Declaration($1, $2, @1.first_line, @1.first_column); }
    ;

data_type
    : BOOLEAN_KEYWORD                                                                                                   { $$ = DeclarationType.BOOLEAN; }
    | CHAR_KEYWORD                                                                                                      { $$ = DeclarationType.CHAR; }
    | DOUBLE_KEYWORD                                                                                                    { $$ = DeclarationType.DOUBLE; }
    | INT_KEYWORD                                                                                                       { $$ = DeclarationType.INT; }
    | STRING_KEYWORD                                                                                                    { $$ = DeclarationType.STRING; }
    ;

iterative
    : do_while                                                                                                          { $$ = $1; }
    | for                                                                                                               { $$ = $1; }
    | while                                                                                                             { $$ = $1; }
    ;

do_while
    : DO code_block WHILE LEFT_PARENTHESIS assignment SEMICOLON                                                         { $$ = new DoWhile($5, $2, @1.first_line, @1.first_column); }
    ;

for
    : FOR LEFT_PARENTHESIS assignment expression SEMICOLON expression RIGHT_PARENTHESIS code_block                      { $$ = new For($3, $4, $6, $8, @1.first_line, @1.first_column); }
    | FOR LEFT_PARENTHESIS declaration expression SEMICOLON expression RIGHT_PARENTHESIS code_block                     { $$ = new For($3, $4, $6, $8, @1.first_line, @1.first_column); }
    ;

while
    : WHILE LEFT_PARENTHESIS expression RIGHT_PARENTHESIS code_block                                                    { $$ = new While($3, $5, @1.first_line, @1.first_column); }
    ;
