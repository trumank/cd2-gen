# CD2 experiments

[docs](https://trumank.github.io/cd2-gen)

## run tests

    deno test

## generate docs

    deno doc --html --name="CD2" ./mod.ts

## example generator

```ts
function generate(): Difficulty {
  const a_var = exp("4 / (6 + ResuppliesCalled()) * TimeDelta(1, 4)");
  return {
    Name: "My generated difficulty",
    Resupply: {
      Cost: 0,
      StartingNitra: 10,
    },
    Watchers: {
      Values: {
        Test: {
          Float: a_var,
        },
      },
    },
    Mule: {
      Scale: a_var,
    },
  };
}
```

yields:

```json
{
  "Name": "My generated difficulty",
  "Resupply": {
    "Cost": 0,
    "StartingNitra": 10
  },
  "Watchers": {
    "Values": {
      "Test": {
        "Float": {
          "Mutate": "Multiply",
          "A": {
            "Mutate": "Divide",
            "A": 4,
            "B": {
              "Mutate": "Add",
              "A": 6,
              "B": {
                "Mutate": "ResuppliesCalled"
              }
            }
          },
          "B": {
            "Mutate": "TimeDelta",
            "InitialValue": 1,
            "RateOfChange": 4
          }
        }
      }
    }
  },
  "Mule": {
    "Scale": {
      "Mutate": "Multiply",
      "A": {
        "Mutate": "Divide",
        "A": 4,
        "B": {
          "Mutate": "Add",
          "A": 6,
          "B": {
            "Mutate": "ResuppliesCalled"
          }
        }
      },
      "B": {
        "Mutate": "TimeDelta",
        "InitialValue": 1,
        "RateOfChange": 4
      }
    }
  }
}
```
