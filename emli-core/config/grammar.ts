export default String.raw`
EMLI {
  Document = MetaCodes ListOf<(Element | ElemDef | string | comments), spaces> end
  MetaCodes = (("#" (~nl space)* MetaCode) | "" "" comment)*
  MetaCode = "import" ("js" | "css") string ";"                       --import
           | "postprocessor" jsBody                                   --postprocessor
           | "preprocessor" jsBody                                    --preprocessor
           | "modify" Properties ";"                           --modify
           | "title" string ";"                                       --title
           | "set" identifier "=" Element ";"                         --set
  
  Element = identifier Properties? ";"                         --unbodied
          | identifier Properties? Body                        --bodied
          | "custom" ":" identifier CustomProps? ";"        --customCall
  
  ElemDef = "custom" ":" identifier "=" (Element_unbodied | Element_bodied)

  Body = "{" (Element | string | comments)* "}"
  Properties = "(" ListOf<Property, ","> ")"
  CustomProps = "[" ListOf<Property, ","> "]"
  Property = identifier ":" string
  
  identifier = ("-" | alnum)+
  nl (a new line) = "\n" | "\r" | "\u2028" | "\u2029"
  string = sQuot (~(sQuot | nl) any)* sQuot
         | dQuot (~(dQuot | nl) any)* dQuot
         | gQuot (~gQuot any)* gQuot
  
  sQuot (single quote) = "'"
  dQuot (double quote) = "\""
  gQuot (multiline quote) = "${'`'}"
  
  jsBody = "~{" (~"}" any)* "}~"
  
  comments = comment | htmlComment
  comment = "//" (~nl any)* nl
  htmlComment = "/!" (~nl any)* nl
}
`;