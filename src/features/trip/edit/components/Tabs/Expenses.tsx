import { useMemo } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Card, Stack, Typography } from "@mui/material";

import ExpenseCategoryIcon from "@features/trip/components/Expenses/ExpenseCategoryIcon";
import ExpensesTable from "@features/trip/components/Expenses/ExpensesTable";
import { EXPENSE_ICON_BY_CATEGORY } from "@features/trip/data";
import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useDialog from "@hooks/useDialog";

import ExpenseDialog from "../../../components/Expenses/ExpenseDialog";
import type { Expense, ExpenseCategory, Trip } from "../../../types";
import ContentCard from "./ContentCard";

type ExpenseGroup = {
  [category in ExpenseCategory]: number;
};

interface Props {
  trip: Trip;
  onUpdate: (data: Partial<Trip>) => void;
}

export default function Expenses({ trip, onUpdate }: Props) {
  const { open, close, isOpen } = useDialog();
  const { md } = useBreakpoints();

  const groupedExpenses = useMemo(
    () => getGroupedExpenses(trip.expenses),
    [trip.expenses],
  );

  const onExpensesDialogSave = (addedExpense: Expense) => {
    onUpdate({ expenses: [...trip.expenses, addedExpense] });
  };

  const onExpenseDelete = (expenseId: string) => {
    const removedExpenseIndex = trip.expenses.findIndex(
      (expense) => expense.id === expenseId,
    );

    const newExpenses = [...trip.expenses];
    newExpenses.splice(removedExpenseIndex, 1);
    onUpdate({ expenses: newExpenses });
    close();
  };

  return (
    <Stack gap={{ xs: 1, md: 2 }}>
      <Stack direction="row" gap={2} sx={{ overflowX: "scroll" }} pb={1}>
        {Object.entries(groupedExpenses).map(([category, amount]) => {
          const castedCategory = category as ExpenseCategory;
          const iconInfo = EXPENSE_ICON_BY_CATEGORY[castedCategory];

          return (
            <Card
              key={category}
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                py: { xs: 2, md: 4 },
                px: { xs: 2, md: 3 },
                minWidth: { xs: 210, md: 274 },
                borderRadius: 4,
              }}
            >
              <Stack gap={2}>
                <ExpenseCategoryIcon
                  isSmallIcon
                  color={iconInfo.color}
                  backgroundColor={iconInfo.backgroundColor}
                  category={castedCategory}
                >
                  <iconInfo.icon />
                </ExpenseCategoryIcon>
                <Typography color="text.secondary">{category}</Typography>
                <Typography variant="h1" component="h4">
                  ${amount}
                </Typography>
              </Stack>
            </Card>
          );
        })}
      </Stack>
      <ContentCard
        title="All Expenses"
        titleElement={
          <AppButton
            variant="outlined"
            onClick={open}
            endIcon={<AddIcon />}
            fullWidth={!md}
          >
            Add Expense
          </AppButton>
        }
      >
        <ExpenseDialog
          isOpen={isOpen}
          onClose={close}
          onSave={onExpensesDialogSave}
        />
        {trip.expenses.length > 0 && (
          <ExpensesTable expenses={trip.expenses} onDelete={onExpenseDelete} />
        )}
      </ContentCard>
    </Stack>
  );
}

function getGroupedExpenses(expenses: Expense[]) {
  const groupedExpenses: ExpenseGroup = {} as ExpenseGroup;
  expenses.reduce((groupedExpensesVal, expense) => {
    const { amount, category } = expense;
    if (groupedExpensesVal[category]) {
      groupedExpensesVal[category] += amount;
    } else {
      groupedExpensesVal[category] = amount;
    }
    return groupedExpensesVal;
  }, groupedExpenses);
  return groupedExpenses;
}
