import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { useCreateUser } from '../api/create-user'
import { useUpdateUser } from '../api/update-user'
import { USER_ROLES } from '../constants/user-constants'
import { userRoleOptions } from '../constants/user-options'

const formSchema = z
  .object({
    username: z.string().min(1, { message: 'required' }),
    email: z
      .string()
      .min(1, { message: 'required' })
      .email({ message: 'invalidEmail' }),
    password: z
      .string()
      .min(1, { message: 'required' })
      .transform((pwd) => pwd.trim()),
    role: z.enum(USER_ROLES),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== '')) {
      if (password === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'required',
          path: ['password'],
        })
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'minLengthPassword',
          path: ['password'],
        })
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'minLowercasePassword',
          path: ['password'],
        })
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'minNumberPassword',
          path: ['password'],
        })
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'passwordsDoNotMatch',
          path: ['confirmPassword'],
        })
      }
    }
  })
type UserForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserMutateDialog({ currentRow, open, onOpenChange }: Props) {
  const { t } = useTranslation()
  const isEdit = !!currentRow
  const createUserMutation = useCreateUser({
    mutationConfig: {
      onSuccess: handleResetForm,
    },
  })
  const updateUserMutation = useUpdateUser({
    mutationConfig: {
      onSuccess: handleResetForm,
    },
  })

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          username: currentRow?.username,
          email: currentRow?.email,
          role: currentRow?.role,
          password: '',
          confirmPassword: '',
          isEdit,
        }
      : {
          username: '',
          email: '',
          role: 'employee',
          password: '',
          confirmPassword: '',
          isEdit,
        },
  })

  const onSubmit = async (values: UserForm) => {
    if (isEdit) {
      updateUserMutation.mutate({
        id: currentRow.id!,
        email: values.email,
        username: values.username,
        password: values.password,
        role: values.role,
      })
    } else {
      createUserMutation.mutate({
        email: values.email,
        username: values.username,
        password: values.password,
        role: values.role,
      })
    }
  }

  function handleResetForm() {
    form.reset()
    onOpenChange(false)
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            {isEdit
              ? t('dialog.edit.title', { ns: 'users' })
              : t('dialog.create.title', { ns: 'users' })}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('dialog.edit.description', { ns: 'users' })
              : t('dialog.create.description', { ns: 'users' })}
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='username'
                disabled={isEdit}
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('name', { ns: 'glossary' })}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('form.name.placeholder', {
                          ns: 'users',
                        })}
                        autoComplete='new-password'
                        classes={{
                          root: 'col-span-4',
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                disabled={isEdit}
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('email', { ns: 'glossary' })}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('form.enterEmail', {
                          ns: 'glossary',
                        })}
                        classes={{
                          root: 'col-span-4',
                        }}
                        autoComplete='new-password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('role', { ns: 'glossary' })}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('form.selectRole', { ns: 'glossary' })}
                      className='col-span-4'
                      items={userRoleOptions.map(({ labelKey, value }) => ({
                        label: t(labelKey as any, { ns: 'glossary' }),
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('password', { ns: 'glossary' })}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t('form.enterPassword', {
                          ns: 'glossary',
                        })}
                        className='col-span-4'
                        autoComplete='new-password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('confirmPassword', { ns: 'glossary' })}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!isPasswordTouched}
                        placeholder={t('form.enterConfirmPassword', {
                          ns: 'glossary',
                        })}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            form='user-form'
            disabled={createUserMutation.isPending}
          >
            {createUserMutation.isPending
              ? t('creating', { ns: 'common' })
              : isEdit
                ? t('update', { ns: 'common' })
                : t('create', { ns: 'common' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
