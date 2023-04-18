%lex

%options case-insensitive

%% /* gramática léxica */

/* datos primitivos */
[0-9]+                          return 'INT_VALUE';
[0-9]+\.[0-9]+                  return 'DOUBLE_VALUE';
\'.?\'                          return 'CHAR_VALUE';

/* datos no primitivos */
\"[^\"]*\"                      return 'STRING_VALUE';

/* palabras reservadas */
"boolean"                       return 'BOOLEAN_KEYWORD';
"break"                         return 'BREAK';
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

/* caracteres de escape */
"\\"                            return 'BACKSLASH';
"\\\""                          return 'DOUBLE_QUOTE';
"\\\'"                          return 'SINGLE_QUOTE';
"\\n"                           return 'NEWLINE';
"\\r"                           return 'RETURN';
"\\t"                           return 'TAB';

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

/* operadores aritméticos */
"%"                             return 'MODULUS';
"*"                             return 'MULTIPLICATION';
"+"                             return 'ADDITION';
"++"                            return 'INCREMENT';
"-"                             return 'SUBTRACTION';
"--"                            return 'DECREMENT';
"/"                             return 'DIVISION';
"^"                             return 'EXPONENTIATION';

/* operadores relacionales */
"!="                            return 'INEQUALITY';
"<"                             return 'LESS_THAN';
"<="                            return 'LESS_THAN_OR_EQUAL_TO';
"=="                            return 'EQUALITY';
">"                             return 'GREATER_THAN';
">="                            return 'GREATER_THAN_OR_EQUAL_TO';

/* operadores lógicos */
"!"                             return 'NOT';
"&&"                            return 'AND';
"||"                            return 'OR';

/* identificadores */
[a-zA-Z][a-zA-Z_$0-9]*          return 'IDENTIFIER';

/* comentarios */
\/\*[^>]*\*\/                   /* ignorar comentario de bloque */
\/\/.*                          /* ignorar comentario de línea */

/* espacios */
\s                              /* ignorar espacios en blanco */

/* errores */
.                               return 'INVALID';

/* fin de línea */
<<EOF>>                         return 'EOF';

/lex

/* operator associations and precedence */

%right 'DECREMENT' 'INCREMENT'
%right 'NOT' UMINUS
%left 'EXPONENTIATION'
%left 'DIVISION' 'MODULUS' 'MULTIPLICATION'
%left 'ADDITION' 'SUBTRACTION'
%left 'EQUALITY' 'GREATER_THAN' 'GREATER_THAN_OR_EQUAL_TO' 'INEQUALITY' 'LESS_THAN' 'LESS_THAN_OR_EQUAL_TO'
%left 'AND'
%left 'OR'
%token INVALID

%start expressions

%% /* gramática sintáctica */
