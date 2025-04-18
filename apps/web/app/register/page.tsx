"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@repo/ui/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { Input } from "@repo/ui/components/ui/input"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group"
import { Separator } from "@repo/ui/components/ui/separator"
import { Upload, Check } from "lucide-react"

const stationFormSchema = z.object({
  name: z.string().min(3, {
    message: "Station name must be at least 3 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  state: z.string().min(2, {
    message: "State is required.",
  }),
  zip: z.string().min(5, {
    message: "ZIP code is required.",
  }),
  description: z.string().optional(),
  chargerType: z.enum(["level1", "level2", "dcFast", "other"], {
    required_error: "You need to select a charger type.",
  }),
  power: z.coerce.number().min(1, {
    message: "Power must be at least 1 kW.",
  }),
  price: z.coerce.number().min(0.01, {
    message: "Price must be at least 0.01 SOL.",
  }),
  connectorTypes: z.string().min(1, {
    message: "At least one connector type is required.",
  }),
})

type StationFormValues = z.infer<typeof stationFormSchema>

export default function RegisterStationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const form = useForm<StationFormValues>({
    //@ts-ignore
    resolver: zodResolver(stationFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      description: "",
      chargerType: "level2",
      power: 7,
      price: 0.25,
      connectorTypes: "Type 2",
    },
  })

  function onSubmit(data: StationFormValues) {
    console.log(data)
    // In a real app, this would submit to an API
    router.push("/register-station/success")
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Register Your Charging Station</h1>
          <p className="text-muted-foreground">
            Join our network and start earning Solana tokens for every charging session
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between">
            <div
              className={`flex-1 flex flex-col items-center ${step >= 1 ? "text-rose-600" : "text-muted-foreground"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 1 ? "bg-rose-100 dark:bg-rose-900" : "bg-muted"
                }`}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : <span>1</span>}
              </div>
              <span className="text-sm">Station Details</span>
            </div>
            <div className="flex-1 flex justify-center">
              <div className={`h-0.5 w-full self-center ${step >= 2 ? "bg-rose-600" : "bg-muted"}`} />
            </div>
            <div
              className={`flex-1 flex flex-col items-center ${step >= 2 ? "text-rose-600" : "text-muted-foreground"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 2 ? "bg-rose-100 dark:bg-rose-900" : "bg-muted"
                }`}
              >
                {step > 2 ? <Check className="h-5 w-5" /> : <span>2</span>}
              </div>
              <span className="text-sm">Technical Specs</span>
            </div>
            <div className="flex-1 flex justify-center">
              <div className={`h-0.5 w-full self-center ${step >= 3 ? "bg-rose-600" : "bg-muted"}`} />
            </div>
            <div
              className={`flex-1 flex flex-col items-center ${step >= 3 ? "text-rose-600" : "text-muted-foreground"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 3 ? "bg-rose-100 dark:bg-rose-900" : "bg-muted"
                }`}
              >
                <span>3</span>
              </div>
              <span className="text-sm">Verification</span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Station Details</CardTitle>
                  <CardDescription>Provide information about your charging station location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Station Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., My Home Charger" {...field} />
                        </FormControl>
                        <FormDescription>This is how your station will appear to users</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Anytown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide additional details about your station..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Include details like parking instructions, access hours, etc.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setStep(2)}>
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                  <CardDescription>Provide details about your charging equipment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="chargerType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Charger Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="level1" />
                              </FormControl>
                              <FormLabel className="font-normal">Level 1 (120V)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="level2" />
                              </FormControl>
                              <FormLabel className="font-normal">Level 2 (240V)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="dcFast" />
                              </FormControl>
                              <FormLabel className="font-normal">DC Fast Charging</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">Other</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="power"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Power Output (kW)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" step="0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (SOL per kWh)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0.01" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="connectorTypes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Connector Types</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Type 2, CCS, CHAdeMO" {...field} />
                        </FormControl>
                        <FormDescription>List all connector types available, separated by commas</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setStep(3)}>
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Verification & Submission</CardTitle>
                  <CardDescription>Verify your information and submit your station</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Station Details</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="text-muted-foreground">Name:</div>
                      <div>{form.getValues("name")}</div>

                      <div className="text-muted-foreground">Address:</div>
                      <div>{`${form.getValues("address")}, ${form.getValues("city")}, ${form.getValues("state")} ${form.getValues("zip")}`}</div>

                      <div className="text-muted-foreground">Description:</div>
                      <div>{form.getValues("description") || "N/A"}</div>
                    </div>

                    <Separator />

                    <h3 className="font-medium">Technical Specifications</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="text-muted-foreground">Charger Type:</div>
                      <div>
                        {form.getValues("chargerType") === "level1" && "Level 1 (120V)"}
                        {form.getValues("chargerType") === "level2" && "Level 2 (240V)"}
                        {form.getValues("chargerType") === "dcFast" && "DC Fast Charging"}
                        {form.getValues("chargerType") === "other" && "Other"}
                      </div>

                      <div className="text-muted-foreground">Power Output:</div>
                      <div>{form.getValues("power")} kW</div>

                      <div className="text-muted-foreground">Price:</div>
                      <div>{form.getValues("price")} SOL per kWh</div>

                      <div className="text-muted-foreground">Connector Types:</div>
                      <div>{form.getValues("connectorTypes")}</div>
                    </div>

                    <Separator />

                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-medium mb-2">Upload Photos (Optional)</h3>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop photos of your charging station, or click to browse
                        </p>
                        <Button type="button" variant="outline" size="sm">
                          Upload Photos
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button type="submit">Submit Station</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}
