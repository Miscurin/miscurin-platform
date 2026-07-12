'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { useDisclosure } from '@/hooks/useDisclosure'

// UI primitives
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Divider from '@/components/ui/Divider'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import { Typography } from '@/components/ui/Typography'
import { Badge } from '@/components/ui/Badge'
import { Chip } from '@/components/ui/Chip'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Radio, RadioGroup } from '@/components/ui/Radio'
import { Skeleton } from '@/components/ui/Skeleton'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { Drawer } from '@/components/ui/Drawer'
import { ProductCard } from '@/components/ui/ProductCard'

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <div className="h-px flex-1 bg-slate-200" />
        <a
          href={`#${id}`}
          className="text-xs text-slate-400 hover:text-brand-600 transition-colors font-mono"
        >
          #{id}
        </a>
      </div>
      {children}
    </section>
  )
}

// ── Demo row ───────────────────────────────────────────────────────────────────
function Row({
  label,
  children,
  vertical,
}: {
  label?: string
  children: React.ReactNode
  vertical?: boolean
}) {
  return (
    <div className="mb-4">
      {label && (
        <p className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wide">
          {label}
        </p>
      )}
      <div
        className={
          vertical
            ? 'flex flex-col gap-3'
            : 'flex flex-wrap items-center gap-3'
        }
      >
        {children}
      </div>
    </div>
  )
}

// ── NAV items (anchors) ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  'Colors', 'Typography', 'Buttons', 'Badges', 'Chips', 'Alerts',
  'Inputs', 'Select', 'Checkbox', 'Radio', 'Skeleton', 'Breadcrumbs',
  'Icons', 'Empty States', 'Cards', 'Product Card', 'Modal', 'Drawer', 'Toast',
]

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DesignSystemPage() {
  const { toast } = useToast()
  const modal = useDisclosure()
  const drawer = useDisclosure()

  const [checkA, setCheckA] = useState(false)
  const [checkB, setCheckB] = useState(true)
  const [radioVal, setRadioVal] = useState('sm')
  const [chip1, setChip1] = useState(false)
  const [chip2, setChip2] = useState(true)
  const [chip3, setChip3] = useState(false)

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-12">
        <Typography variant="display" className="mb-2">
          Design System
        </Typography>
        <Typography variant="body" color="muted">
          Every primitive, pattern, and token powering the Miscurin commerce platform.
        </Typography>
      </div>

      {/* Floating nav */}
      <nav
        aria-label="Design system sections"
        className="mb-12 flex flex-wrap gap-1.5 rounded-2xl bg-white border border-slate-100 p-3 shadow-sm"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* ── COLORS ── */}
      <Section id="colors" title="Colors">
        {(
          ['brand', 'success', 'warning', 'error', 'info', 'slate'] as const
        ).map((palette) => {
          const shades =
            palette === 'brand'
              ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
              : palette === 'slate'
              ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
              : [50, 100, 500, 600, 700]
          return (
            <div key={palette} className="mb-3">
              <p className="text-xs font-mono text-slate-400 mb-2 capitalize">
                {palette}
              </p>
              <div className="flex gap-1">
                {shades.map((s) => (
                  <div
                    key={s}
                    className={`h-10 flex-1 rounded-lg bg-${palette}-${s}`}
                    title={`${palette}-${s}`}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </Section>

      {/* ── TYPOGRAPHY ── */}
      <Section id="typography" title="Typography">
        <div className="flex flex-col gap-4 bg-white rounded-2xl border border-slate-100 p-8">
          {(
            [
              'display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
              'subtitle', 'body', 'caption', 'overline', 'label', 'code',
            ] as const
          ).map((v) => (
            <Typography key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)} — The quick brown fox
            </Typography>
          ))}
        </div>
      </Section>

      {/* ── BUTTONS ── */}
      <Section id="buttons" title="Buttons">
        <Row label="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Row>
        <Row label="Sizes">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
        <Row label="States">
          <Button disabled>Disabled</Button>
          <Button loading>Saving…</Button>
        </Row>
      </Section>

      {/* ── BADGES ── */}
      <Section id="badges" title="Badges">
        <Row label="Variants">
          <Badge variant="default">Default</Badge>
          <Badge variant="brand">Brand</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </Row>
        <Row label="Sizes">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </Row>
        <Row label="With dot + pill">
          <Badge variant="success" dot pill>
            Live
          </Badge>
          <Badge variant="warning" dot pill>
            Pending
          </Badge>
          <Badge variant="error" dot pill>
            Failed
          </Badge>
        </Row>
      </Section>

      {/* ── CHIPS ── */}
      <Section id="chips" title="Chips">
        <Row label="Selectable">
          <Chip
            selected={chip1}
            onClick={() => setChip1((v) => !v)}
          >
            Fashion
          </Chip>
          <Chip
            selected={chip2}
            onClick={() => setChip2((v) => !v)}
          >
            Accessories
          </Chip>
          <Chip
            selected={chip3}
            onClick={() => setChip3((v) => !v)}
          >
            Footwear
          </Chip>
        </Row>
        <Row label="Variants">
          <Chip variant="default">Default</Chip>
          <Chip variant="brand">Brand</Chip>
          <Chip variant="success">Success</Chip>
          <Chip variant="warning">Warning</Chip>
          <Chip variant="error">Error</Chip>
        </Row>
        <Row label="Removable">
          <Chip onRemove={() => toast.info('Chip removed')}>Removable</Chip>
        </Row>
      </Section>

      {/* ── ALERTS ── */}
      <Section id="alerts" title="Alerts">
        <div className="flex flex-col gap-3">
          <Alert variant="info" message="This is an informational message." />
          <Alert variant="success" message="Action completed successfully." />
          <Alert variant="warning" message="Please review before continuing." />
          <Alert variant="error" message="Something went wrong — please try again." />
        </div>
      </Section>

      {/* ── INPUTS ── */}
      <Section id="inputs" title="Inputs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <div>
            <Label htmlFor="demo-email">Email</Label>
            <Input
              id="demo-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="demo-error">With error</Label>
            <Input
              id="demo-error"
              type="text"
              defaultValue="bad-input"
              error="This field is required"
            />
          </div>
          <div>
            <Label htmlFor="demo-disabled">Disabled</Label>
            <Input id="demo-disabled" type="text" defaultValue="Read only" disabled />
          </div>
        </div>
      </Section>

      {/* ── SELECT ── */}
      <Section id="select" title="Select">
        <div className="max-w-xs flex flex-col gap-4">
          <Select
            label="Size"
            hint="Select a garment size"
            options={[
              { value: '', label: 'Choose a size…' },
              { value: 'xs', label: 'XS' },
              { value: 's', label: 'S' },
              { value: 'm', label: 'M' },
              { value: 'l', label: 'L' },
              { value: 'xl', label: 'XL' },
            ]}
          />
          <Select
            label="Category"
            error="Required"
            options={[{ value: '', label: 'Choose…' }]}
          />
        </div>
      </Section>

      {/* ── CHECKBOX ── */}
      <Section id="checkbox" title="Checkbox">
        <Row label="Sizes + states" vertical>
          <Checkbox
            id="chk-a"
            checked={checkA}
            onChange={(e) => setCheckA(e.target.checked)}
            label="Subscribe to newsletter"
            description="Receive weekly style updates and exclusive offers."
          />
          <Checkbox
            id="chk-b"
            checked={checkB}
            onChange={(e) => setCheckB(e.target.checked)}
            label="Save payment details"
          />
          <Checkbox id="chk-c" checked={false} readOnly disabled label="Disabled checkbox" />
          <Checkbox id="chk-d" checked={false} readOnly indeterminate label="Indeterminate" />
        </Row>
      </Section>

      {/* ── RADIO ── */}
      <Section id="radio" title="Radio">
        <RadioGroup label="Choose plan">
          <Radio
            name="plan-demo"
            value="sm"
            checked={radioVal === 'sm'}
            onChange={() => setRadioVal('sm')}
            label="Starter"
            description="Up to 100 products"
          />
          <Radio
            name="plan-demo"
            value="md"
            checked={radioVal === 'md'}
            onChange={() => setRadioVal('md')}
            label="Growth"
            description="Up to 1 000 products"
          />
          <Radio
            name="plan-demo"
            value="lg"
            checked={radioVal === 'lg'}
            onChange={() => setRadioVal('lg')}
            label="Enterprise"
            description="Unlimited"
          />
        </RadioGroup>
      </Section>

      {/* ── SKELETON ── */}
      <Section id="skeleton" title="Skeleton">
        <Row label="Primitives">
          <Skeleton variant="text" className="w-48" />
          <Skeleton variant="circle" className="h-10 w-10" />
          <Skeleton variant="rect" className="h-10 w-32" />
        </Row>
        <Row label="Cards" vertical={false}>
          <Skeleton.Card className="w-64" />
          <Skeleton.ProductCard className="w-48" />
        </Row>
      </Section>

      {/* ── BREADCRUMBS ── */}
      <Section id="breadcrumbs" title="Breadcrumbs">
        <Row label="Default">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Women', href: '/women' },
              { label: 'Jackets', href: '/women/jackets' },
              { label: 'Leather Moto Jacket' },
            ]}
          />
        </Row>
        <Row label="maxItems=3 (collapsed)">
          <Breadcrumbs
            maxItems={3}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Women', href: '/women' },
              { label: 'Outerwear', href: '/women/outerwear' },
              { label: 'Jackets', href: '/women/jackets' },
              { label: 'Leather Moto Jacket' },
            ]}
          />
        </Row>
      </Section>

      {/* ── ICONS ── */}
      <Section id="icons" title="Icons">
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-4">
          {(
            [
              'search', 'shopping-bag', 'heart', 'user', 'settings', 'bell',
              'check', 'x', 'chevron-down', 'chevron-right', 'chevron-left',
              'chevron-up', 'arrow-right', 'arrow-left', 'plus', 'minus',
              'edit', 'trash', 'eye', 'eye-off', 'lock', 'mail',
              'star', 'info', 'alert-triangle', 'alert-circle', 'filter', 'sort',
              'grid', 'list', 'upload', 'download', 'copy',
              'external-link', 'refresh', 'tag', 'menu',
            ] as const
          ).map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all"
              title={name}
            >
              <Icon name={name} className="h-5 w-5 text-slate-600" />
              <span className="text-[9px] font-mono text-slate-400 text-center break-all leading-none">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── EMPTY STATES ── */}
      <Section id="empty-states" title="Empty States">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmptyState
            icon={<Icon name="shopping-bag" className="h-12 w-12 text-slate-300" />}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Start browsing to find something you love."
            action={{ label: 'Browse products', onClick: () => toast.info('Browsing…') }}
            secondaryAction={{ label: 'View wishlist', onClick: () => toast.info('Wishlist…') }}
          />
          <EmptyState
            variant="card"
            icon={<Icon name="search" className="h-12 w-12 text-slate-300" />}
            title="No results found"
            description="Try adjusting your search or filters."
            action={{ label: 'Clear filters', onClick: () => toast.info('Cleared') }}
          />
        </div>
        <div className="mt-4">
          <EmptyState
            variant="compact"
            icon={<Icon name="bell" className="h-8 w-8 text-slate-300" />}
            title="No notifications"
            description="You're all caught up."
          />
        </div>
      </Section>

      {/* ── CARDS ── */}
      <Section id="cards" title="Cards">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { padding: 'p-4', label: 'Small pad' },
            { padding: 'p-6', label: 'Default pad' },
            { padding: 'p-8', label: 'Large pad' },
          ].map(({ padding, label }) => (
            <Card key={label} className={padding}>
              <Typography variant="h6" className="mb-1">
                {label}
              </Typography>
              <Typography variant="caption" color="muted">
                Card with custom padding.
              </Typography>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── PRODUCT CARD ── */}
      <Section id="product-card" title="Product Card">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <ProductCard
            id="p1"
            name="Leather Moto Jacket"
            brand="Miscurin Studio"
            price={395}
            image="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80"
            isNew
            onWishlistToggle={() => toast.success('Wishlist updated')}
            onAddToCart={() => toast.success('Added to bag')}
            rating={4}
            reviewCount={28}
          />
          <ProductCard
            id="p2"
            name="Silk Slip Dress"
            brand="Miscurin Studio"
            price={195}
            originalPrice={295}
            image="https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80"
            onWishlistToggle={() => toast.success('Wishlist updated')}
            onAddToCart={() => toast.success('Added to bag')}
            rating={5}
            reviewCount={142}
          />
          <ProductCard
            id="p3"
            name="Wool Overcoat"
            brand="Miscurin Studio"
            price={550}
            image="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80"
            isSoldOut
            onWishlistToggle={() => toast.info('Saved to wishlist')}
          />
          <ProductCard
            id="p4"
            name="Tailored Trousers"
            brand="Miscurin Studio"
            price={185}
            badge="New Season"
            image="https://images.unsplash.com/photo-1594938298603-c8148c4b4a5f?w=600&q=80"
            onWishlistToggle={() => toast.success('Wishlist updated')}
            onAddToCart={() => toast.success('Added to bag')}
          />
        </div>
      </Section>

      {/* ── MODAL ── */}
      <Section id="modal" title="Modal">
        <Row label="Trigger">
          <Button variant="primary" onClick={modal.open}>
            Open Modal
          </Button>
        </Row>
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.close}
          title="Confirm purchase"
          description="Review your order before placing it."
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={modal.close}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  modal.close()
                  toast.success('Order placed!', { title: 'Success' })
                }}
              >
                Place order
              </Button>
            </div>
          }
        >
          <div className="flex flex-col gap-4 text-sm text-slate-600">
            <div className="rounded-xl bg-slate-50 p-4 flex justify-between">
              <span>Leather Moto Jacket × 1</span>
              <span className="font-semibold text-slate-900">$395</span>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-success-600">Free</span>
            </div>
            <Divider />
            <div className="flex justify-between font-semibold text-slate-900">
              <span>Total</span>
              <span>$395</span>
            </div>
          </div>
        </Modal>
      </Section>

      {/* ── DRAWER ── */}
      <Section id="drawer" title="Drawer">
        <Row label="Trigger">
          <Button variant="secondary" onClick={drawer.open}>
            Open Drawer
          </Button>
        </Row>
        <Drawer
          isOpen={drawer.isOpen}
          onClose={drawer.close}
          title="Cart"
          description="3 items"
          footer={
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                drawer.close()
                toast.success('Proceeding to checkout')
              }}
            >
              Checkout — $775
            </Button>
          }
        >
          <div className="flex flex-col gap-4 text-sm text-slate-600">
            {[
              { name: 'Leather Moto Jacket', price: 395 },
              { name: 'Silk Slip Dress', price: 195 },
              { name: 'Tailored Trousers', price: 185 },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-slate-100 p-3 bg-slate-50"
              >
                <span>{item.name}</span>
                <span className="font-semibold text-slate-900">${item.price}</span>
              </div>
            ))}
          </div>
        </Drawer>
      </Section>

      {/* ── TOAST ── */}
      <Section id="toast" title="Toast">
        <Row label="Types">
          <Button
            variant="primary"
            onClick={() => toast.success('Profile saved successfully', { title: 'Saved' })}
          >
            Success
          </Button>
          <Button
            variant="danger"
            onClick={() => toast.error('Something went wrong. Please try again.', { title: 'Error' })}
          >
            Error
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.warning('Unsaved changes will be lost.', { title: 'Warning' })}
          >
            Warning
          </Button>
          <Button
            variant="ghost"
            onClick={() => toast.info('New collection arriving next week.')}
          >
            Info
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              toast.error('This toast stays until dismissed.', {
                title: 'Persistent',
                duration: 0,
              })
            }
          >
            Persistent
          </Button>
        </Row>
      </Section>
    </main>
  )
}
