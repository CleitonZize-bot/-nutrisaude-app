"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, ShoppingBasket } from "lucide-react";

import {
  getIngredientesEmCasa,
  setIngredientesEmCasa,
} from "@/lib/preferences";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { NutrisaudeProfile } from "@/lib/pocketbase";
import { buscarReceitasPorIngredientes } from "@/lib/receitas-data";

type Receita = {
  nome: string;
  icone: string;
  refeicao: string;
  ingredientes: string[];
  modo: string;
  calorias: number;
  proteina: number;
  carbo: number;
  gordura: number;
};

const REFEICAO_FILTRO_LABEL: Record<string, string> = {
  todas: "Todas",
  cafe: "Cafe",
  lanche: "Lanche",
  almoco: "Almoco",
  jantar: "Jantar",
  ceia: "Ceia",
};

type PlanIngredientsViewProps = {
  profile: NutrisaudeProfile;
};

export function PlanIngredientsView({ profile }: PlanIngredientsViewProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [recipeFilter, setRecipeFilter] = useState("todas");

  // Carrega ingredientes salvos do localStorage (persiste entre sessões)
  useEffect(() => {
    const salvos = getIngredientesEmCasa();
    if (salvos.length > 0) setIngredients(salvos);
  }, []);

  const recipeSuggestions = useMemo(() => {
    if (ingredients.length === 0) return [];

    const receitas = buscarReceitasPorIngredientes(
      ingredients,
      profile.condicoes
    ) as Receita[];

    if (recipeFilter === "todas") return receitas;
    return receitas.filter((item) => item.refeicao === recipeFilter);
  }, [ingredients, profile.condicoes, recipeFilter]);

  function addIngredient() {
    const normalized = ingredientInput.trim().toLowerCase();
    if (!normalized || ingredients.includes(normalized)) return;
    const novos = [...ingredients, normalized];
    setIngredients(novos);
    setIngredientesEmCasa(novos); // persiste
    setIngredientInput("");
  }

  function removeIngredient(name: string) {
    const novos = ingredients.filter((item) => item !== name);
    setIngredients(novos);
    setIngredientesEmCasa(novos); // persiste
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
        <CardHeader className="gap-2 px-6 pt-6">
          <div className="flex items-center gap-3">
            <ShoppingBasket data-icon="inline-start" className="text-primary" />
            <CardTitle>O que voce tem em casa?</CardTitle>
          </div>
          <CardDescription>
            Digite ingredientes disponiveis para sugerirmos receitas compativeis.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 px-6 pb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <FieldGroup className="flex-1">
              <Field>
                <FieldLabel htmlFor="ingrediente">Ingrediente</FieldLabel>
                <FieldContent>
                  <Input
                    id="ingrediente"
                    value={ingredientInput}
                    onChange={(event) => setIngredientInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addIngredient();
                      }
                    }}
                    placeholder="Ex: frango, brocolis, azeite..."
                    className="h-12 rounded-2xl bg-white"
                  />
                </FieldContent>
              </Field>
            </FieldGroup>

            <Button type="button" className="h-12 rounded-[1rem] px-6 text-base font-bold shadow-[0_14px_30px_rgba(0,196,114,0.18)]" onClick={addIngredient}>
              Adicionar
            </Button>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            {ingredients.length > 0 ? (
              ingredients.map((item) => (
                <Button
                  key={`ingrediente-${item}`}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => removeIngredient(item)}
                >
                  {item}
                </Button>
              ))
            ) : (
              <p className="text-sm text-slate-500">Nenhum ingrediente adicionado ainda.</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(REFEICAO_FILTRO_LABEL).map(([value, label]) => (
              <Button
                key={`filtro-${value}`}
                type="button"
                variant={recipeFilter === value ? "ghost" : "outline"}
                size="sm"
                className={
                  recipeFilter === value
                    ? "rounded-full bg-slate-800 text-white hover:bg-slate-800 hover:text-white"
                    : "rounded-full border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }
                onClick={() => setRecipeFilter(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        {recipeSuggestions.length > 0 ? (
          recipeSuggestions.map((recipe) => (
            <Card
              key={`receita-${recipe.nome}`}
              className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0"
            >
              <CardHeader className="gap-2 px-6 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{recipe.icone}</div>
                    <div>
                      <CardTitle>{recipe.nome}</CardTitle>
                      <CardDescription>
                        {REFEICAO_FILTRO_LABEL[recipe.refeicao] || recipe.refeicao}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{recipe.calorias} kcal</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredientes.map((item) => (
                    <Badge key={`item-${recipe.nome}-${item}`} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm leading-7 text-slate-600">{recipe.modo}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{recipe.proteina}g proteina</Badge>
                  <Badge variant="secondary">{recipe.carbo}g carb.</Badge>
                  <Badge variant="secondary">{recipe.gordura}g gordura</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Alert>
            <BookOpen />
            <AlertTitle>Nenhuma receita sugerida ainda</AlertTitle>
            <AlertDescription>
              Adicione ingredientes e escolha um filtro para ver receitas compativeis com seu plano.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
