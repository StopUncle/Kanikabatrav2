import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { CreditCard, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { SettingsHeader } from '../../components/ui/SettingsHeader';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { paymentService, PaymentRecord } from '../../services/paymentService';
import { useAuthStore } from '../../stores/authStore';

type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded';

function getStatusIcon(status: PaymentStatus) {
  switch (status) {
    case 'completed':
      return <CheckCircle size={20} color={colors.success} />;
    case 'pending':
      return <Clock size={20} color={colors.warning} />;
    case 'failed':
      return <XCircle size={20} color={colors.error} />;
    case 'refunded':
      return <RefreshCw size={20} color={colors.accent} />;
    default:
      return <CreditCard size={20} color={colors.tertiary} />;
  }
}

function getStatusColor(status: PaymentStatus): string {
  switch (status) {
    case 'completed':
      return colors.success;
    case 'pending':
      return colors.warning;
    case 'failed':
      return colors.error;
    case 'refunded':
      return colors.accent;
    default:
      return colors.tertiary;
  }
}

function getProductLabel(productType: string): string {
  switch (productType) {
    case 'subscription':
      return 'Subscription';
    case 'course':
      return 'Course';
    case 'coaching':
      return 'Coaching Session';
    default:
      return productType;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatAmount(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

function PaymentItem({ payment }: { payment: PaymentRecord }) {
  const status = payment.status as PaymentStatus;

  return (
    <Card style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentIcon}>
          {getStatusIcon(status)}
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentType}>{getProductLabel(payment.product_type)}</Text>
          <Text style={styles.paymentDate}>{formatDate(payment.created_at)}</Text>
        </View>
        <View style={styles.paymentAmount}>
          <Text style={styles.amountText}>{formatAmount(payment.amount, payment.currency)}</Text>
          <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      </View>

      {payment.paypal_order_id && (
        <View style={styles.paymentDetails}>
          <Text style={styles.detailLabel}>Transaction ID</Text>
          <Text style={styles.detailValue}>{payment.paypal_order_id}</Text>
        </View>
      )}
    </Card>
  );
}

export default function PaymentHistoryScreen() {
  const { user } = useAuthStore();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    void loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    if (!user) return;

    setLoading(true);
    const history = await paymentService.getPaymentHistory(user.id);
    setPayments(history);
    setLoading(false);
  };

  const onRefresh = useCallback(async () => {
    if (!user) return;

    setRefreshing(true);
    const history = await paymentService.getPaymentHistory(user.id);
    setPayments(history);
    setRefreshing(false);
  }, [user]);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <CreditCard size={48} color={colors.tertiary} />
      </View>
      <Text style={styles.emptyTitle}>No Transactions Yet</Text>
      <Text style={styles.emptyText}>
        Your payment history will appear here once you make a purchase.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SettingsHeader title="Payment History" />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : (
        <FlatList
          data={payments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PaymentItem payment={item} />}
          contentContainerStyle={[
            styles.listContent,
            payments.length === 0 && styles.emptyList,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.accent}
              colors={[colors.accent]}
            />
          }
          ListHeaderComponent={
            payments.length > 0 ? (
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Transactions</Text>
                <Text style={styles.summaryValue}>{payments.length}</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  emptyList: {
    flex: 1,
  },
  // Summary card
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryTitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  // Payment card
  paymentCard: {
    gap: spacing.sm,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  paymentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentType: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  paymentDate: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: 2,
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  statusText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    marginTop: 2,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  detailValue: {
    fontSize: typography.xs,
    color: colors.secondary,
    fontFamily: 'monospace',
  },
  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
