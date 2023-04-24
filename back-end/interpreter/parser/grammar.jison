%{
const {DeclarationType} = require("../expressions/declaration-assignment/declarationType");
const {OperationType} = require("../expressions/operation/operationType");
const {Operation} = require("../expressions/operation/operation");
const {Print} = require("../statements/output/print");
const {Variable} = require("../expressions/declaration-assignment/variable");
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
"+"                             return 'ADDITION';
"++"                            return 'INCREMENT';
"-"                             return 'SUBTRACTION';
"--"                            return 'DECREMENT';
"/"                             return 'DIVISION';
"^"                             return 'EXPONENTIATION';

/* operadores lógicos */
"!"                             return 'NOT';
"&&"                            return 'AND';
"||"                            return 'OR';

/* operadores relacionales */
"!="                            return 'INEQUALITY';
"<"                             return 'LESS_THAN';
"<="                            return 'LESS_THAN_OR_EQUAL_TO';
"=="                            return 'EQUALITY';
">"                             return 'GREATER_THAN';
">="                            return 'GREATER_THAN_OR_EQUAL_TO';

/* palabras reservadas */
"boolean"                       return 'BOOLEAN_KEYWORD';
"break"                         return 'BREAK';
"case"                          return 'case';
"char"                          return 'CHAR_KEYWORD';
"continue"                      return 'CONTINUE';
"default"                       return 'DEFAULT';
"do while"                      return 'DO_WHILE';
"double"                        return 'DOUBLE_KEYWORD';
"else if"                       return 'ELSE_IF';
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
.                               return 'INVALID';

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
    | statements EOF                                                        { return $1; }
    ;

statements
    : statement                                                             { $$ = [$1]; }
    | statements statement                                                  { $1.push($2); $$ = $1; }
    ;

statement
    : built_in                                                              { $$ = $1; }
    ;

built_in
    : print                                                                 { $$ = $1; }
    ;

print
    : PRINT LEFT_PARENTHESIS expression RIGHT_PARENTHESIS SEMICOLON         { $$ = new Print($3); }
    ;

expression
    : CHAR_VALUE                                                            { $$ = new Variable(DeclarationType.CHAR, $1); }
    | DOUBLE_VALUE                                                          { $$ = new Variable(DeclarationType.DOUBLE, $1); }
    | FALSE                                                                 { $$ = new Variable(DeclarationType.BOOLEAN, $1); }
    | INT_VALUE                                                             { $$ = new Variable(DeclarationType.INT, $1); }
    | STRING_VALUE                                                          { $$ = new Variable(DeclarationType.STRING, $1); }
    | TRUE                                                                  { $$ = new Variable(DeclarationType.BOOLEAN, $1); }
    | expression ADDITION expression                                        { $$ = new Operation(OperationType.ADDITION, $1, $3); }
    | expression DIVISION expression                                        { $$ = new Operation(OperationType.DIVISION, $1, $3); }
    | expression EXPONENTIATION expression                                  { $$ = new Operation(OperationType.EXPONENTIATION, $1, $3); }
    | expression MODULUS expression                                         { $$ = new Operation(OperationType.MODULUS, $1, $3); }
    | expression MULTIPLICATION expression                                  { $$ = new Operation(OperationType.MULTIPLICATION, $1, $3); }
    | expression SUBTRACTION expression                                     { $$ = new Operation(OperationType.SUBTRACTION, $1, $3); }
    ;
